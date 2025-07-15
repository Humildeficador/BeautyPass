import { Server, Socket } from 'socket.io'
import { createMessage } from '../../services/messages/createMessage'
import { findUserByPublicId } from '../../services/users/findUserByPublicId'
import { createConversate } from '../../services/conversations/createConversate'
import { findConversateByParticipants } from '../../services/conversations/findConversateByParticipants'

type MessageInfo = {
  to: string
  content: string
}

/* Cria uma sala para aquele usuario com todas os sockets dele nela, para propositos de multi-conexões */
export const userSendMessage = (io: Server, socket: Socket) => {
  socket.on('send-private-message', async ({ to, content }: MessageInfo) => {
    try {
      const from: string = socket.data.user.sub

      const target = await findUserByPublicId(to)

      if (!target) throw new Error('Usuário não encontrado')

      if (target.id === from) throw new Error('Cabaço, não manda msg pra sí mesmo, carente do caralho')

      const conversation = await findConversateByParticipants({
        targetId: target.id,
        userId: from
      }) ?? await createConversate({ targetId: target.id, userId: from })

      if (!socket.rooms.has(conversation.id)) {
        socket.join(conversation.id)
        console.log(`Usuario solicitante entrou na conversa ${conversation.id} pois não existia ainda quando se logou`)
      }

      const message = await createMessage({
        conversationId: conversation.id,
        content,
        from
      })

      io.to(socket.data.user.publicId).emit('message-submitted', message)

      io.to(to).emit('new-private-message', message)
      io.to(to).emit('message-notification', {
        conversationId: conversation.id,
        message
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('Unknown error', error)
      }
    }
  })
}