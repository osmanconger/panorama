const express = require("express");
const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dotenv = require("dotenv").config();


const port = 5000;
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
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

app.post('/text-mail', function (req, res, next) {
  const {to, subject } = req.body;
  const mailData = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
