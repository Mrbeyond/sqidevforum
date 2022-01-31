
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  // cors:  {
    // origin: "*", 
    // origin: "http://localhost:8080",
  //   origin: ["http://localhost:8081", "http://localhost:8080"],
  //   methods: ["GET", "POST"],
  //   allowedHeaders: ["my-custom-header"], 
  //   credentials: true
  // },
  cors: true,
  
});

io.on('connection', (socket) => {
  console.log('a user connected from controller');
  let {handshake:{headers}} = socket;
  console.log({headers});
  socket.emit("one", Math.random().toFixed(4));
  socket.emit("connected", Math.random().toFixed(4));
  socket.emit("flutter", Math.random().toFixed(4));
  // .emit("one",) 

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});


module.exports = {app, io, server, express};