
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", //"*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

/*io.on('connection', (socket) => {
  console.log('a user connected from controller');
  let {handshake:{headers}} = socket;
  console.log({headers});

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});*/


module.exports = {app, io, server, express};