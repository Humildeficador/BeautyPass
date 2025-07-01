import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { server } from '../server'
import { addUserSocket, removeUserSocket } from '../utils/onlineUsers'

const runIo = () => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

  io.use((socket, next) => {
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
  })

  io.on('connection', (socket) => {
    const user = socket.data.user
    const userId = user.sub

    addUserSocket(userId, socket.id)

    socket.on('disconnect', () => {
      removeUserSocket(userId, socket.id)
    })
  })
}

export { runIo }