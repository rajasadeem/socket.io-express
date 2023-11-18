import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
});

app.get("/", (req, res) => {
  io.to("123").emit("message", "Hello John!");
  res.json({
    status: 200,
    message: "socket test",
  });
});

server.listen(5000, () => {
  console.log("server running");
});
