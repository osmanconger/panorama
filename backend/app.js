const express = require("express");
const http = require("http");
const uuid = require("uuid");
const getVideoToken = require("./generate-token");
const bodyParser = require("body-parser");
const port = 5000;

const env = require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Again required for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/api/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = getVideoToken(identity, room);
  res.send(JSON.stringify({ token: token }));
});

//Check if room exists
app.get("/api/room/:roomId", (req, res) => {
  client.video.v1
    .rooms(req.params.roomId)
    .fetch()
    .then((room) => res.status(200).send(JSON.stringify({ room: room })))
    .catch(() => {
      res.status(404).send(JSON.stringify({ err: "Room not found" }));
    });
});

//Get token to access existing room
app.post("/api/room/:roomId/token", (req, res) => {
  const roomId = req.params.roomId;
  const identity = req.body.identity;
  const token = getVideoToken(identity, roomId);
  res.send(JSON.stringify({ token: token, id: roomId }));
});

//Create a new room, return the id and token to access the room
app.post("/api/room/token", (req, res) => {
  const roomId = uuid.v4();
  const identity = req.body.identity;
  const token = getVideoToken(identity, roomId);
  res.send(JSON.stringify({ token: token, id: roomId }));
});

// //Get room information
// app.get("/api/:roomId", (req, res) => {
//   res.json({ roomId: req.params.roomId });
// });

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
