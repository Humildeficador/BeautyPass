import { Server, Socket } from "socket.io";
import { getOnlineUsers, removeUserSocket } from "../utils/userSessions";

export const onlineUsers = (io: Server, socket: Socket) => {
  io.emit('online-users', getOnlineUsers())
  socket.on('disconnect', () => {
    removeUserSocket(socket.data.user.sub, socket.id)
    io.emit('online-users', getOnlineUsers())
  })
}