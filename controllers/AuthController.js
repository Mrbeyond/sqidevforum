"use strict";

require('dotenv').config();
const {sign} = require('jsonwebtoken');
const {hash, compare} = require('bcrypt');
const commonMethods = require('./commonMethods');
const {sql} = require('./../sql');
const { resolve } = require('path');
const { rejects } = require('assert');
const db = sql();


const key = process.env.key;

/** The collection of methods related to user authentification */
const userController = {

  /** The controller for user signup */
  creatUser: async (req, res) => {
    try {
      const { password } = req.body;

      /** Encrypt the password here */
      let encryptedKey= await hash(password, 10);
      console.log(encryptedKey);

      /** mutate the encryoted key back into the request body */
      req.body.password = encryptedKey;

      /** Save the student here */
      try {
        let newStudentId = await new Promise((resolve, reject)=>{
          db.query(`INSERT INTO students SET ?`, req.body, (err, row, f)=>{
            if(err) reject(500);
            resolve(row.insertId);
          })
        })

        /** Fetch out the saved student */
        let student = await new Promise((resolve, reject)=>{
          db.query(`SELECT * FROM students WHERE id = ?`, newStudentId, (err, row, f)=>{
            if(err) reject(500);
            resolve(row[0]);
          })
        })

        /** Jwt token for subsequent auth */
        let token = sign({data: newStudentId}, key);
        console.log(student, token);

        return commonMethods.successReturn(res, {data: student, token:token});

      } catch (e) {
        if(e === 500) return commonMethods.serverErrorReturn(res);
       return commonMethods.serverErrorReturn(res);
      }
    } catch (err) {
      console.log(err, 500)
      return commonMethods.serverErrorReturn(res);
    }
  },

  login: async(req, res)=>{
    try {
      /** get the user by email */
      const {User} =  req.body;
      /** Confirm if the password is correct */

      let checkPassword = await compare(req.body.password, User.password);
      if(!checkPassword) return commonMethods.errorReturn(res, "User Not Found");
       /** destructure out the user id and make token out of it */
       let {id} = User;
       let token = sign({data: id}, key);
       return commonMethods.successReturn(res, {data: User, token: token});    
    } catch (e) {
      return commonMethods.serverErrorReturn(res);
    }
  },

  logOut: async(req, res)=>{
    try {
      return commonMethods.successReturn(res, 'Successful');    
    } catch (e) {
      return commonMethods.serverErrorReturn(res);
    }
  }
}




module.exports = userController;