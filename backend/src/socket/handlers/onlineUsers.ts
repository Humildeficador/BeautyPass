import { Server, Socket } from "socket.io";
import { getOnlineUsers, removeUserSocket } from "../utils/userSessions";

const DELAY = 2000

export const onlineUsers = (io: Server, socket: Socket) => {
  socket.on('request-online-users', (a) => {
    io.emit('online-users', getOnlineUsers())
  })

  socket.on('disconnect', () => {
    const stillConnected = getOnlineUsers().some(
      u => u.userId === socket.data.user.id
    )
    if (!stillConnected) {
      setTimeout(() => {
        removeUserSocket(socket.data.user.sub, socket.id)
        io.emit('online-users', getOnlineUsers())
      }, DELAY)
    }
  })
}