"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');


const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
  {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db
  }
);
db.connect();


app.get('/', (req, res)=>{

  db.query('CREATE DATABASE IF NOT EXISTS sqi', (err,res,field)=>{
    if(err) return console.log(err);
    console.log(res, 'field is ', field);
  })

  console.log("Welcome to your community");
  res.status(200).json("Welcome to your community");
})

app.listen(process.env.port || 2050, ()=>{
  console.log("Running on 2050");
})


