import { io, Socket } from 'socket.io-client'

let socketInstance: Socket | null = null

export const connectSocket = (token: string): Socket => {
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
      auth: { token }
    })

    socketInstance.on('connect', () => {
      console.log('✅ Conectado com ID:', socketInstance!.id)
    })

    socketInstance.on('disconnect', () => {
      console.log('❌ Desconectado')
    })
  }

  return socketInstance
}

export const getSocket = () => socketInstance