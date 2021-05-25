"use strict";

const dotenv = require('dotenv');
const {userTable} = require('./Migrations/Tables');
const {sql} = require('./sql');
const cors = require('cors');
const db = sql();
const Routers = require('./Routes/index');

const {app,server, express} = require('./RealTime');


dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  "origin":["http://localhost:8080", "http://127.0.0.1:8081"], //"*" ,
  "methods": "GET,HEAD,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
};

const db_holder = process.env.CLEARDB_DATABASE_URL;

app.use(cors(corsOptions));



app.use('/api', Routers)
// console.log(db_holder);

app.get('/migrations/migrate', async(req, res)=>{
  try {
    db.query(`CREATE DATABASE IF NOT EXISTS ${db_holder}`, (err,res,field)=>{
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


server.listen(process.env.PORT || 2050, ()=>{
  console.log("Running on 2050");
})



