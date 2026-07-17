"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  return socket;
};