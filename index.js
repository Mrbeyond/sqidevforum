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
app.get('/', async(req, res)=>{

  // db.query('CREATE DATABASE IF NOT EXISTS sqi', (err,res,field)=>{
  //   if(err) return console.log(err);
  //   console.log(res, 'field is ', field);
  // })

  db.query(userTable, (err, res, field)=>{
    if(err) return console.log(err);
    console.log(res, 'field is ', field);
  });

  try {
    const data ={
      email: 'mm@mm.cm',
      // firstName: 'first',
      // lastName: 'last',
      // course: 'se',
      // password: 'key',
      phone: '0803',
      // gender: 'male'

    }
    
    // db.query(`INSERT INTO ?? SET ? `, ['students', data], (err, res, f)=>{
    //   if(err) return console.log(err);
    //   console.log(res);
    // });
  db.query(` SELECT * FROM students WHERE email=? OR phone = ?`, Object.values(data), (err, res, f)=>{
    if(err) return console.log(err);
    console.log(res);
    
  });
  // const resu = await db.query(` SELECT * FROM students`);
  //  console.log(Object.keys(resu));
    // console.log(resu);
  } catch (e) {
    console.log('err');
  
  }

  // console.log("Welcome to your community");
  res.status(200).json("Welcome to your community");
})


app.listen(process.env.port || 2050, ()=>{
  console.log("Running on 2050");
})


