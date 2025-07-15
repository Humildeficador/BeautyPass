import { Server, Socket } from 'socket.io'
import { setupRoomsEvents } from './rooms'
import { userSendMessage } from './messages'
import { onlineUsers } from './onlineUsers'

/* Iniciador de todos os eventos */
export const setupHandlers = (io: Server, socket: Socket) => {
  onlineUsers(io, socket)
  setupRoomsEvents(io, socket)
  userSendMessage(io, socket)
}