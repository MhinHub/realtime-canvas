const express = require("express");
const http = require("http");
const cors = require("cors");
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://realtime-canvas-mhinhub.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

io.on("connection", (socket) => {
  socket.on("client-ready", () => {
    socket.broadcast.emit("get-canvas-state");
  });

  socket.on("canvas-state", (state) => {
    console.log("received canvas state");
    socket.broadcast.emit("canvas-state-from-server", state);
  });

  socket.on("draw-line", ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
  });

  socket.on("clear", () => io.emit("clear"));
});

server.listen(3001, () => {
  console.log("✔️ Server listening on port 3001");
});
