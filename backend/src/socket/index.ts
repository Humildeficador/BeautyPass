import { Server } from 'socket.io'
import { server } from '../server'
import { setupHandlers } from './handlers'
import { socketAuthMiddleware } from './middleware/auth'
import { addUserSocket, getOnlineUsers, removeUserSocket } from './utils/userSessions'

/* Cria a instancia do server do socket, usa o middleware e atualiza a lista de usuarios online  (./utils/userSessions) */
export const setupSocket = () => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.use(socketAuthMiddleware)

  io.on('connection', (socket) => {
    const {
      sub: userId,
      firstName,
      lastName,
      avatarUrl
    } = socket.data.user

    addUserSocket(userId, { firstName, lastName, avatarUrl }, socket.id)

    setupHandlers(io, socket)
  })

  return io
}