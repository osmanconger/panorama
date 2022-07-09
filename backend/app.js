const express = require("express");
const http = require("http");
const uuid = require("uuid");
// const mediasoup = require("mediasoup");
const { Server } = require("socket.io");
const port = 5000;

const app = express();
const server = http.createServer(app);

//Required for CORS policy
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//Again required for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

//Listen for connections
io.on("connection", (socket) => {
  //sends message to sender only
  socket.emit("joined", socket.id);

  socket.on("disconnect", () => {
    //sends message to all clients except sender
    socket.broadcast.emit(`user with id ${socket.id} left the call`);
  });

  socket.on("joinRoom", ({ roomId }) => {
    io.to(roomId).emit(`${socket.id} joined room ${roomId}`);
  });
});

//Generate new room ID
app.get("/api/create-room", (req, res) => {
  const roomId = uuid.v4();
  res.json({ roomId: roomId });
});

//Get room information
app.get("/api/:roomId", (req, res) => {
  res.json({ roomId: req.params.roomId });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
