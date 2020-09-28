"use strict";
const validator = require('./Validators');
const commonMethods = require('./../controllers/commonMethods');
const {verify} = require('jsonwebtoken');
require('dotenv').config();
const {sql} = require('./../sql');
const { resolve } = require('path');
const db = sql();

const key = process.env.key;

/** This middlewares for basic auth routes and student related auth data */
const userMiddleWare = {

  /** This is used to promisify query to fit in async */
  checkStudent: (data)=>{
    return new Promise((resolve, reject)=>{
      db.query(
        `SELECT * FROM students WHERE email=? OR phone =? `,
        data,
        (err, row, f)=>{
          if(err) reject(500)
          if(row.length > 0) reject('dup');
          resolve(true);
        }
      )
    })

  },

  /** This is the middleware for user sign up and update */
  filterStudentSignup: async(req, res, next)=>{
    try {
      /** confirm the payload here */
      let check = await validator.testStudent(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');
      const {email, phone} = req.body;
      let pass = await userMiddleWare.checkStudent([email,phone]);
      if(!pass) return commonMethods.serverErrorReturn(res);
      next();
    } catch (e) {
      console.log(e, 'midman')
      if(e === 500) return commonMethods.serverErrorReturn(res);
      if(e === 'dup') return commonMethods.errorReturn(res, 'User Exists');

      /** return 500 error */
      return commonMethods.serverErrorReturn(res);
    
    }
  },

  filterLogin: async(req, res, next)=>{
    try {
      /** confirm the payload here */
      let check = await validator.testLogin(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');
      /** confirm user here */
      const Student = await new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM students WHERE email=? LIMIT 1`, [req.body.email], (err, row, f)=>{
          if(err) reject(500);
          if(row.length < 1 ) reject(404);
          resolve(row); 
        })
      });
      if(!Student) return commonMethods.serverErrorReturn(res);
      // console.log(Student, 122);
      req.body.Student = Student[0];
      // console.log(req.body, 155);
      next();
    } catch (e) {
      if(e === 500) return commonMethods.serverErrorReturn(res);
      if(e === 404) return commonMethods.errorReturn(res, "User Not Found");
      /** return 500 error */
      return commonMethods.serverErrorReturn(res)
    }
  },

  confirmToken: async(req, res, next)=>{
    try {
      let container = req.headers.authorization;
      if(!container) return commonMethods.errorReturn(res, 'Intruder');
      let token, studentId;

      /** confirm the token here */
      try {
        token= container.split(" ")[1];
        studentId = verify(token, key);      
      } catch (e) {
        return commonMethods.errorReturn(res, "Please Login");
      }

      if(!studentId) return commonMethods.errorReturn(res, "Please Login");
      console.log(studentId);
      /** Check if student exists and fectch the student for request parsing */
      let studentExists = await new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM students WHERE id = ? LIMIT 1`, studentId.data, (err, row, f)=>{
          if(err) reject(500);
          if(row.length < 1) reject(404);
          resolve(row[0].id);

        })
      });
      if(!studentExists) return commonMethods.errorReturn(res, "Please Login");
      req.studentId = studentExists;
      next();
    } catch (e) {

      if(e === 500) return commonMethods.serverErrorReturn(res);
      if(e === 404) return commonMethods.errorReturn(res, "Please Login");
      /** return 500 error */
      return commonMethods.serverErrorReturn(res);
    }     
  },

  changeProfilePic: async(req, res)=>{
    try {

      /** To be completed later for */
    
    } catch (e) {
    
    }
  }

}


module.exports = userMiddleWare;