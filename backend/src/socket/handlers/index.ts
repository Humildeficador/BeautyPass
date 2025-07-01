import { Server, Socket } from "socket.io";
import { setupRoomsEvents } from "./rooms";

/* Iniciador de todos os eventos */
export const setupHandlers = (io: Server, socket: Socket) => {
  setupRoomsEvents(io, socket)
}