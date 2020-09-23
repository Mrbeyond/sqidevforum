"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const {userTable} = require('./Migrations/Tables');

// console.log(userTable);
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


app.get('/', async(req, res)=>{

  // db.query('CREATE DATABASE IF NOT EXISTS sqi', (err,res,field)=>{
  //   if(err) return console.log(err);
  //   console.log(res, 'field is ', field);
  // })

  // db.query(userTable, (err, res, field)=>{
  //   if(err) return console.log(err);
  //   console.log(res, 'field is ', field);
  // });

  try {
    const data ={
      email: 'mm@mm.cm',
      firstName: 'first',
      lastName: 'last',
      course: 'se',
      password: 'key'
    }
  //  const resu = await db.query(`INSERT INTO ?? SET ? `, ['students', data]);
  // db.query(` SELECT * FROM students`, (err, res, f)=>{
  //   if(err) return console.log(err);
  //   console.log(res.length);
    
  // });
  const resu = await db.query(` SELECT * FROM students`);
  //  console.log(Object.keys(resu));
    console.log(resu);
  } catch (e) {
    console.log('err');
  
  }

  // console.log("Welcome to your community");
  res.status(200).json("Welcome to your community");
})


app.listen(process.env.port || 2050, ()=>{
  console.log("Running on 2050");
})


