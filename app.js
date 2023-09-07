const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  // message server
  socket.on('send-message', message => {
    io.emit('message', message);
  });

  // chat at screen share
  socket.on("chat message", message => {
    io.to("screenSharingRoom").emit("chat message", message);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
