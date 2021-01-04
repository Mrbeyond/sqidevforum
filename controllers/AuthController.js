"use strict";

require('dotenv').config();
const {sign} = require('jsonwebtoken');
const {hash, compare} = require('bcrypt');
const commonMethods = require('./commonMethods');
const {sql} = require('./../sql');
const db = sql();

const validator = require('./../Middlewares/Validators');


const key = process.env.key;

/** The collection of methods related to student authentification */
const studentController = {

  /** Password removal from student data */
  passwordRemoval: async(data)=>{
      if(typeof data !== 'object') return;
      await delete data.password;
      return data;
  },


  /** Create new student or log the existing student into the system */

  authProcessor: async(req, res)=>{
    try {
      const checker = await new Promise((resolve, reject)=>{
        db.query(
          `SELECT * FROM students WHERE email=? LIMIT 1`, req.body.email,
          (err, row, f)=>{
            if(err) reject(500)
            if(row.length > 0){
              req.body.Student = row[0];
              resolve (true);
            }else{
              resolve(false);
            }
          }
        )
      });

      if(checker){
        studentController.login(req, res);
        console.log('\n old \n');
      }else{
        studentController.creatUser(req, res);
        console.log('\n new \n');
      }
    } catch (e) {
      console.log(e);
      return commonMethods.serverErrorReturn(res);
    }
    

  },

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
            if(err){
              console.log(err, 'is the error');
              reject(500);
            }               
            resolve(row.insertId);
          })
        })

        /** Fetch out the new created student */
        let student = await new Promise((resolve, reject)=>{
          db.query(`SELECT * FROM students WHERE id = ?`, newStudentId, (err, row, f)=>{
            if(err) reject(500);
            resolve(row[0]);
          })
        })

        /** Jwt token for subsequent auth */
        let token = sign({data: newStudentId}, key);
        console.log(student, token);
        student = await studentController.passwordRemoval(student);

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
      const {Student} =  req.body;
      /** Confirm if the password is correct */

      let checkPassword = await compare(req.body.password, Student.password);
      if(!checkPassword) return commonMethods.errorReturn(res, "Student Not Found");
       /** destructure out the student id and make token out of it */
       let {id} = Student;
       let token = sign({data: id}, key);
       let student = await studentController.passwordRemoval(Student);
       return commonMethods.successReturn(res, {data: student, token: token});    
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
  },


  updateStudent: async(req, res)=>{
    try{
      let check = await validator.testBasicUpdate(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');
      const update = await new Promise((resolve, reject)=>{
        db.query('UPDATE students SET ? WHERE id = ?', [req.body, req.studentId], (err, row, f)=>{
          if(err) reject(500);
          db.query(`SELECT * FROM students WHERE id =?`, req.studentId, (err2, row2, f2)=>{
            if(err2) reject(500);
            resolve(row2[0]);
          })
        })
      });

      let student = await studentController.passwordRemoval(update);
      return commonMethods.successReturn(res, student);       

    } catch(e){
      // if(e === 500) return commonMethods.serverErrorReturn(res);
      return commonMethods.serverErrorReturn(res);

    }
  },

  changeEmail: async(req, res)=>{
    try{
      let check = await validator.testChangeEmail(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');

      const emailExists = await new Promise((resolve, reject)=>{
        db.query(`SELECT email FROM students WHERE email =? LIMIT 1`, req.body.email, (err, row, f)=>{
          if(err) reject(500);
          if(row.length) resolve(row[0]);
          resolve(0);
        })
      });
    
      if(emailExists)  return commonMethods.errorReturn(res, 'Intruder');

      const update = await new Promise((resolve, reject)=>{
        db.query('UPDATE students SET ? WHERE id = ?', [req.body, req.studentId], (err, row, f)=>{
          if(err) reject(500);
          db.query(`SELECT * FROM students WHERE id =?`, req.studentId, (err2, row2, f2)=>{
            if(err2) reject(500);
            resolve(row2[0]);
          })
        })
      });

      let student = await studentController.passwordRemoval(update);
      return commonMethods.successReturn(res, student);       

    } catch(e){
      // if(e === 500) return commonMethods.serverErrorReturn(res);
      console.log(e)
      return commonMethods.serverErrorReturn(res);

    }
  },


  changePhone: async(req, res)=>{
    try{
      let check = await validator.testChangePhone(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');

      const phoneExists = await new Promise((resolve, reject)=>{
        db.query(`SELECT phone FROM students WHERE phone =? LIMIT 1`, req.body.phone, (err, row, f)=>{
          if(err) reject(500);
          if(row.length) resolve(row[0]);
          resolve(0);
        })
      });
    
      if(phoneExists)  return commonMethods.errorReturn(res, 'Intruder');

      const update = await new Promise((resolve, reject)=>{
        db.query('UPDATE students SET ? WHERE id = ?', [req.body, req.studentId], (err, row, f)=>{
          if(err) reject(500);
          db.query(`SELECT * FROM students WHERE id =?`, req.studentId, (err2, row2, f2)=>{
            if(err2) reject(500);
            resolve(row2[0]);
          })
        })
      });
      let student = await studentController.passwordRemoval(update);
      return commonMethods.successReturn(res, student);       

    } catch(e){
      // if(e === 500) return commonMethods.serverErrorReturn(res);
      console.log(e)
      return commonMethods.serverErrorReturn(res);

    }
  },

  changePassword: async(req, res)=>{
    try{
      let check = await validator.testChangePassword(req.body);
      if(!check) return commonMethods.errorReturn(res, 'Intruder');

      let encrypted = await hash(req.body.password, 10);
      
      const update = await new Promise((resolve, reject)=>{
        db.query('UPDATE students SET ? WHERE id = ?', [{password:encrypted}, req.studentId], (err, row, f)=>{
          if(err) reject(500);
          db.query(`SELECT * FROM students WHERE id =?`, req.studentId, (err2, row2, f2)=>{
            if(err2) reject(500);
            resolve(row2[0]);
          })
        })
      });

      let student = await studentController.passwordRemoval(update);
      return commonMethods.successReturn(res, student);       

    } catch(e){
      // if(e === 500) return commonMethods.serverErrorReturn(res);
      console.log(e)
      return commonMethods.serverErrorReturn(res);

    }

  }

}




module.exports = studentController;