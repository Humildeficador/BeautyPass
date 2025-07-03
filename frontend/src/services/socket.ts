import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = (token: string): Socket => {
  if (socket && socket.connected) return socket

  socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: { token }
  })

  socket.on('connect', () => {
    if (socket) {
      console.log('✅ Conectado com ID:', socket.id)
    }
  })

  socket.on('disconnect', () => {
    console.warn('❌ Desconectado')
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const socketInstance = (): Socket => {
  if (!socket) {
    throw new Error('Socket ainda não foi inicializado, inicie com o initToken(token) primeiramente.')
  }
  return socket
} 