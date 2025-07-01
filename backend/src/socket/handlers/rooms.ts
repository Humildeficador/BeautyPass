import { Server, Socket } from "socket.io";

/* Cria uma sala para aquele usuario com todas os sockets dele nela, para propositos de multi-conexões */
export const setupRoomsEvents = (io: Server, socket: Socket) => {
  const user = socket.data.user
  socket.join(user.sub)
}