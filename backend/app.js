const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const session = require("express-session");

const port = 5000;

const app = express();
app.use(express.json());

const server = http.createServer(app);

//Again required for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
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
    return res.status(400).end("password is missing"); // to do: all errors in .json

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
        return res.json(username);
      });
    });

    return res.json(username);
});


server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
