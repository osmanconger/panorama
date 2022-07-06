const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors());
const port = 5000;
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket)=> {
      console.log('User Online');
      socket.on('canvas-data', (data)=> {
            socket.broadcast.emit('canvas-data', data);
            
      })
})



app.get("/", (req, res) => {
  res.send("Hello World!");
});

http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
