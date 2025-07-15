import { Server, Socket } from 'socket.io'
import { getOnlineUsers, removeOnlineUser } from '../utils/onlineUsers'

export const onlineUsers = (io: Server, socket: Socket) => {
  socket.on('get-online-users', () => {
    io.emit('online-users', getOnlineUsers())
  })

  socket.on('disconnect', () => {
    removeOnlineUser(socket.data.user.publicId, socket.id)
    io.emit('online-users', getOnlineUsers())
  })
}