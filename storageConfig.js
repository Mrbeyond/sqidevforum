const multer = require('multer');
const {join, extname} = require('path');
const cloudinary = require("cloudinary");

const dataUri = require("datauri/parser");
const dataParser= new dataUri();
require('dotenv').config();

console.log(extname("ade.ade"));
// const DatauriParser = require('datauri/parser');
// const parser = new DatauriParser();

// let formatBufferTo64 = file =>
//   parser.format(extname(file.originalname).toString(), file.buffer)

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, join(__dirname, '/public')/*'/uploads'*/ );
  },
  filename: (req, file, cb)=>{
    // console.log(file); 
    cb(null, file.fieldname+`-${Date.now()}-`+extname(file.originalname))
  },

  fileFilter: (req, file, cb)=>{
     // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },  
})

const cloudStorage = multer.diskStorage({
  filename: (req, file, cb)=>{
    console.log(file.fieldname, ' from clst');
    cb(null, file.fieldname+`-${Date.now()}-`+extname(file.originalname))
  },  
  fileFilter: (req, file, cb)=>{
     // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },  
})

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,  
  api_secret: process.env.CLOUD_SECRET,  
  secure: true
});

const dataURI = file => dataParser.format(extname(file.originalname).toString(), file.buffer);

const mems = multer.memoryStorage();


module.exports = {
  storage:multer({storage}), 
  cloudStorage: multer({cloudStorage}),
  cloud: cloudinary,
  memsStorage: multer({mems}),
  dataURI,
 };