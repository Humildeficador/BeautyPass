import { app } from './app'
import { createServer } from 'node:http'
import { runIo } from './lib/io'

export const server = createServer(app)

runIo()

// Código antigo comentado por segurança

/* import { app } from './app'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'

const server = createServer(app)

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
  console.log('Novo socket conectado: ', socket.id)

  socket.on('disconnect', () => {
    console.log('Socket desconectado: ', socket.id)
  })
})

export { server, io } */