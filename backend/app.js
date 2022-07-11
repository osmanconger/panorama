const express = require("express");
const http = require("http");
const uuid = require("uuid");
const getVideoToken = require("./generate-token");
const bodyParser = require("body-parser");
const port = 5000;

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //Required for CORS policy
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

//Again required for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// //Listen for connections
// io.on("connection", (socket) => {
//   //sends message to sender only
//   console.log(socket.id);
//   socket.emit("connected", socket.id);

//   socket.on("disconnect", () => {
//     //sends message to all clients except sender
//     socket.broadcast.emit(`user with id ${socket.id} left the call`);
//   });

//   socket.on("joinedRoom", ({ roomId }) => {
//     io.to(roomId).emit(`${socket.id} joined room ${roomId}`);
//   });
// });

// app.get("/api/token", (req, res) => {
//   const identity = req.body.identity;
//   const room = req.body.room;
//   const token = getVideoToken(identity, room);
//   res.send(JSON.stringify({ token: token }));
// });

app.post("/api/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = getVideoToken(identity, room);
  res.send(JSON.stringify({ token: token }));
});

//Create a new room, return the room token
app.post("/api/room", (req, res) => {
  const roomId = uuid.v4();
  res.json({ roomId: roomId });
  const identity = req.body.identity;
  const room = roomId;
  const token = getVideoToken(identity, room);
  res.send(JSON.stringify({ token: token, id: roomId }));
});

// //Get room information
// app.get("/api/:roomId", (req, res) => {
//   res.json({ roomId: req.params.roomId });
// });

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
