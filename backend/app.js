const express = require("express");
const http = require("http");
const uuid = require("uuid");
//const mediasoup = require("mediasoup");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const session = require("express-session");

const { Server } = require("socket.io");
const port = 5000;

const app = express();
app.use(express.json());

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
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Listen for connections
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
/*
const createWorker = () => {
  return mediasoup.createWorker().then((worker) => {
    return worker;
  });
};*/

//Generate new room ID
app.get("/api/create-room", (req, res) => {
  const roomId = uuid.v4();
  res.json({ roomId: roomId });
});

//TODO: Actually create room in create-room and verify room info here;
//Get room information
app.get("/api/:roomId", (req, res) => {
  res.json({ roomId: req.params.roomId });
});

// database stuff
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const users = require('./models/model');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

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
    return res.status(400).end("password is missing");

  let uname = req.body.username;
  let password = req.body.password;
  
  
  users.findOne({ username: uname }, function (err3, user) {
    if (err3) return res.status(500).end(err3);
    if (user) {
      return res.status(409).end("username " + uname + " already exists");
    }
    // hash the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // insert user
      users.create(
        { username: uname, password: hash },
        function (err2, userCreated) {
          if (err2) return res.status(500).end(err2);
          // initialize cookie
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("username", uname, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })
          );
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
  
    let username = req.body.username;
    let password = req.body.password;
    return res.json(username);
   /*// retrieve user from the database
    users.findOne({ _id: username }, function (err, user) {
      if (err) return res.status(500).end(err);
      if (!user) return res.status(401).end("access denied");
      let hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (!result) return res.status(401).end("access denied");
        // initialize cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("username", user._id, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
        );
        req.session.user = user;
        return res.json(username);
      });
    });*/
  });


server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
