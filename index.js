 "use strict";

const dotenv = require('dotenv');
const {userTable} = require('./Migrations/Tables');
const {sql} = require('./sql');
const cors = require('cors');
const db = sql();
const Routers = require('./Routes/index');

const {app,server, express} = require('./RealTime');
const {storage, dataURI, cloudStorage, cloud, memsStorage} = require('./storageConfig');
const path = require('path');
const { createReadStream } = require('streamifier');


dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public')));

const corsOptions = {
  "origin":[
    "http://localhost:8080",
    "http://localhost:3000", 
    "http://127.0.0.1:8081",
    "http://localhost:8081"
  ], //"*" ,
  "methods": "GET,HEAD,POST,PUT,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
};

const db_holder = process.env.db;

app.use(cors(corsOptions));



app.use('/api', Routers)
// console.log(db_holder);

app.get('/migrations/migrate', async(req, res)=>{
  try {
    db.getConnection((err, con)=>{
      if (err) throw err;
      con.query(`CREATE DATABASE IF NOT EXISTS ${db_holder}`, (err,res,field)=>{
        if(err) return console.log(err);
        console.log(res, 'field is ', field);
      })
    
      con.query(userTable, (err, res, field)=>{
        if(err) return console.log(err); 
        console.log(res, 'field is ', field);
      });


    })
  
  } catch (e) {    
    res.status(500).json(e);
  }
  res.status(200).json("Welcome to your community");
})

app.get('/', async(req,res)=>{
  
  console.log(req.headers);
  res.status(200).json('111');
})

app.post('/post', async(req,res)=>{
  console.log(typeof req.body);
  res.status(200).json('111');
})

/** File upload test */
app.post('/files', (req,res)=>{
  console.log('here');
  // return;
  memsStorage.single('files')(req, res, (err)=>{
    // console.log(err, 'clodsing err');
    console.log("inside multer"); 
    if(err){
      console.log(err, "inside multer");
      return res.status(500).json(err)
    }
    // let {file:{path}} = req;
    let{file} = req;
    // console.log(req.file);
    try {
      let dUri = dataURI(req.file);
      console.log({dUri});
      return res.status(200).json(dUri); 
    
    } catch (e) {
      console.log(e);
      return res.status(500).json("datauri error"); 
    }

    // let streamer = cloud.v2.uploader.upload_stream(
    //   {foler: 'Streams'},
    //   (err, result)=>{
    //     console.log(err);
    //     console.log({result});
    //     if( !err){
    //       return res.status(200).json(result);

    //     }
    //     console.log("end");
    //     return res.status(500).json("error"); 
    //   }  
    // );

    // createReadStream(file.buffer).pipe(streamer);
    // cloud.v2.uploader.upload(req.file, (err, result)=>{
    //   console.log(err);
    //   console.log({result});
    //   if( !err){
    //     return res.status(200).json(result);

    //   }
    //   console.log("end");
    //   return res.status(200).json("error");
    // });
    // return res.status(200).json("last");
  })
})


app.get('/store', async(req,res)=>{
  // console.log(req)
  let {headers:{authorization}} = req;
  console.log(authorization);
  // console.log(req.headers);

  res.status(200).json(
    [
      {
       "productName":"Nokia c2",
       "price": 5000,
       "quantity": 10,
       "available": true,
       "description": "Old and archaic gadget"
      },
      {
       "productName":"Tecno f9",
       "price": 15000,
       "quantity": 50,
       "available": true,
       "description": "Old but cool"
      },
      {
       "productName":"Tecno camon 12",
       "price": 125000,
       "quantity": 8,
       "available": true,
       "description": "Trendy"
      },
      {
       "productName":"Iphone 11",
       "price": 25000,
       "quantity": 15,
       "available": true,
       "description": "Expensive class"
      },
      {
       "productName":"Infinix hot8",
       "price": 50000,
       "quantity": 14,
       "available": true,
       "description": "Not bad"
      },
     ]
    );
})



server.listen(process.env.PORT || 2050, ()=>{
  console.log("Running on 2050");
})



