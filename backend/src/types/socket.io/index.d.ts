import { Server } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    data: {
      user?: {
        sub: string;
        firstName: string;
        lastName: string;
        publicId: string
      };
    };
  }
}