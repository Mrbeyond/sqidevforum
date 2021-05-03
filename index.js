"use strict";

const dotenv = require('dotenv');
const {userTable} = require('./Migrations/Tables');
const {sql} = require('./sql');
const cors = require('cors');
const db = sql();
const Routers = require('./Routes/index');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  "origin":["http://localhost:8080", "http://127.0.0.1:8081"], //"*" ,
  "methods": "GET,HEAD,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
};

app.use(cors(corsOptions))



app.use('/api', Routers)
app.get('/migrations/migrate', async(req, res)=>{
  try {
    db.query('CREATE DATABASE IF NOT EXISTS sqi', (err,res,field)=>{
      if(err) return console.log(err);
      console.log(res, 'field is ', field);
    })
  
    db.query(userTable, (err, res, field)=>{
      if(err) return console.log(err);
      console.log(res, 'field is ', field);
    });
  
  } catch (e) {    
    res.status(500).json(e);
  }
  res.status(200).json("Welcome to your community");
})

app.get('/', async(req,res)=>{
  res.status(200).json('111');
})

io.on('connection', (socket) => {
  console.log('a user connected');
  let {handshake:{headers}} = socket;
  console.log(headers);
  socket.emit("checkout", {a:1,b:12})

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(process.env.port || 2050, ()=>{
  console.log("Running on 2050");
})



