import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { prisma } from '../../lib/prisma'

/* Middleware de autenticação usando JWT e guardando o decode em socket.data.user */
export const socketAuthMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

  const token: string = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Token ausente!'))
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    const conversationsId = await prisma.user.findFirst({
      where: {
        id: decoded.sub as string
      },
      select: {
        Conversations: {
          select: {
            conversationId: true
          }
        }
      }
    })

    socket.data.user = decoded

    if (conversationsId) {
      socket.data.user.conversationsId = conversationsId.Conversations
    }

    next()
  } catch (err) {
    return next(new Error('Token inválido!'))
  }

}