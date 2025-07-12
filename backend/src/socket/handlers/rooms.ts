import { Server, Socket } from 'socket.io'
import { findConversationByUserId } from '../../services/conversations/findConversationByUserId'

/* Cria uma sala para aquele usuario com todas os sockets dele nela, para propositos de multi-conexões */
export const setupRoomsEvents = async (io: Server, socket: Socket) => {
  const user = socket.data.user

  const conversationsId = await findConversationByUserId(user.sub)

  if (conversationsId) {
    conversationsId.map(({ id }) => {
      socket.join(id)
    })
  }
  socket.join(user.publicId)

  socket.on('join-conversation', (conversationId: string) => {
    socket.join(conversationId)
  })
}