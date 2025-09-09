import { Server, Socket } from "socket.io";

const connectedUsers: Map<string, string> = new Map();
let ioInstance: Server;

export const initializeSocket = (io: Server) => {
  ioInstance = io;
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      connectedUsers.set(userId, socket.id);
      console.log(`User connected: ${userId} -> ${socket.id}`);
    }

    socket.on("disconnect", () => {
      if (userId) {
        connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId} -> ${socket.id}`);
      } else {
        console.log(`Socket disconnected: ${socket.id}`);
      }
    });
  });
};

export const getSocketIdByUserId = (userId: string): string | undefined => {
  return connectedUsers.get(userId);
};

export const getIO = (): Server => {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized");
  }
  return ioInstance;
};
