const express = require("express");
const http = require("http");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://realtime-canvas-mhinhub.vercel.app",
      "https://admin.socket.io",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

io.on("connection", (socket: any) => {
  socket.on("client-ready", () => {
    socket.broadcast.emit("get-canvas-state");
  });

  socket.on("canvas-state", (state: any) => {
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
