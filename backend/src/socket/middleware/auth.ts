import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'

/* Middleware de autenticação usando JWT e guardando o decode em socket.data.user */
export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

  const token: string = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Token ausente!'))
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    socket.data.user = decoded
    next()
  } catch (err) {
    return next(new Error('Token inválido!'))
  }

}