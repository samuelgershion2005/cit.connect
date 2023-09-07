const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectedUsers = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('newUserConnect', (username) => {
    connectedUsers.push(username);
    io.emit('updateUserList', connectedUsers);
  });

  socket.on('userDisconnect', (username) => {
    connectedUsers.splice(connectedUsers.indexOf(username), 1);
    io.emit('updateUserList', connectedUsers);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
