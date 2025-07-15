import { Server } from 'socket.io'
import { server } from '../server'
import { setupHandlers } from './handlers'
import { socketAuthMiddleware } from './middleware/auth'
import { addOnlineUser } from './utils/onlineUsers'

let io: Server

/* Cria a instancia do server do socket.io, usa o middleware e atualiza a lista de usuarios online  (./utils/userSessions) */
export const setupSocket = () => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.use(socketAuthMiddleware)

  io.on('connection', (socket) => {
    const {
      firstName,
      lastName,
      avatarUrl,
      publicId
    } = socket.data.user

    addOnlineUser({
      publicId,
      userInfo: { firstName, avatarUrl, lastName },
      socketId: socket.id
    })

    setupHandlers(io, socket)
  })

  return io
}

export const ioInstance = (): Server => {
  if (!io) {
    throw new Error('Io ainda não foi inicializado.')
  }
  return io
} 