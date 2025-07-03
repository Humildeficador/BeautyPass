import { Server, Socket } from "socket.io";
import { prisma } from "../../lib/prisma";

type MessageInfo = {
  to: string
  content: string
}

/* Cria uma sala para aquele usuario com todas os sockets dele nela, para propositos de multi-conexões */
export const userSendMessage = (io: Server, socket: Socket) => {
  socket.on('send-private-message', async ({ to, content }: MessageInfo) => {
    try {
      const from: string = socket.data.user.sub

      if (to === socket.data.user.sub) throw new Error('Cabaço, não manda msg pra sí mesmo')

      const conversation = await prisma.conversation.findFirst({
        where: {
          participants: {
            every: {
              userId: { in: [from, to] }
            }
          }
        },
        include: { participants: true }
      })
        ?? await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: [
                  { userId: from },
                  { userId: to }
                ]
              }
            }
          }
        })

      const message = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          content: content,
          senderId: from
        }
      })

      io.to(to).emit('new-private-message', message)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('Unknown error', error)
      }
    }
  })
}