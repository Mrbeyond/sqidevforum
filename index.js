"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {userTable} = require('./Migrations/Tables');
const {sql} = require('./sql');
const db = sql();
const Routers = require('./Routes/index');

// console.log(userTable);
const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));



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


app.listen(process.env.port || 2050, ()=>{
  console.log("Running on 2050");
})


