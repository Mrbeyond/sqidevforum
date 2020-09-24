"use strict";

const joi = require('joi');

/** Basic payload schema confrimed and put to test here */
const formValidators = {

  signUpAndUpdateValidators: joi.object({

    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    course: joi.string().required(),
    phone: joi.string().required(),
    gender: joi.string().valid(...['Male', 'Female']).required(),
    password: joi.string().regex(/^[A-Za-z0-9]{6,}/).required()

  }),

  /** This method puts the user schema payload to test
   * it will be called inside middleware for users signup and update
   */
  testUser: async(payload)=>{
    try {
      await formValidators.signUpAndUpdateValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e)
     return false;
    }
  },

  /** The validator for login request payload  
   * will be called inside auth middleware for login
  */
  loginValidators: joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(6).required(),

  }),

  /** the login  request payload is checked here */
  testLogin: async(payload)=>{
    try {
      await formValidators.loginValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

}

module.exports = formValidators;

