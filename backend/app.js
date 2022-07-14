const express = require("express");
const nodemailer = require("nodemailer");
const http = require("http");
const uuid = require("uuid");
const getVideoToken = require("./generate-token");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const session = require("express-session");

const port = 5000;

const env = require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(express.json());

const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// database stuff
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const users = require("./models/user");
const rooms = require("./models/room.js")

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

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
  rooms.findOne({ id: room }, function (err3, data) {
    if (data) {
      data.participants.push(identity);
      data.save();
    }
    });
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

  // store room in database -> TO DO: fix so that this isnt upon generation, but upon host joining room
  rooms.create({id: roomId},
    function (err2, createdRoom) {
      if (err2) return res.status(500).end(err2);
      createdRoom.participants.push(identity);
      createdRoom.save();
    });
  res.send(JSON.stringify({ token: token, id: roomId }));
});

// //Get room information
// app.get("/api/:roomId", (req, res) => {
//   res.json({ roomId: req.params.roomId });
// });


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  req.username = req.session.user ? req.session.user._id : null;
  console.log("HTTP request", req.username, req.method, req.url, req.body);
  next();
});

// sign up route
app.post("/api/signup/", function (req, res, next) {
  // check for missing info
  if (!("username" in req.body))
    return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing"); // to do: all errors in .json

  let uname = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  users.findOne({ username: uname }, function (err3, user) {
    if (err3) return res.status(500).end(err3);
    if (user) {
      return res.status(409).end("username " + uname + " already exists"); // TO DO: check for unique email too
    }
    // hash the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // insert user
      users.create(
        { username: uname, password: hash, email: email },
        function (err2, userCreated) {
          if (err2) return res.status(500).end(err2);
          req.session.user = userCreated;
          return res.json(uname);
        }
      );
    });
  });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  if (!("username" in req.body))
    return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");

  let uname = req.body.username;
  let password = req.body.password;

  // retrieve user from the database
  users.findOne({ username: uname }, function (err, user) {
    if (err) return res.status(500).end(err);
    if (!user) return res.status(401).end("access denied");
    let hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (!result) return res.status(401).end("access denied");
      req.session.user = user;
      return res.status(200).json(user);
    });
  });

  // return res.json(req.session.user);
});

// get room participants
app.get("/api/room/:roomId/participants", (req, res) => {
  
});

// email stuff
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(process.env.EMAIL);
});

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

app.post('/api/text-mail', function (req, res, next) {
  const {email, html } = req.body;
  console.log(email);
  const mailData = {
      from: process.env.EMAIL,
      to: email,
      subject: "Panorama video call summary",
      html: html,
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
