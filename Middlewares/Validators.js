"use strict";

const joi = require('joi');

/** Basic payload schema confrimed and put to test here */
const formValidators = {

  signUpAndUpdateValidators: joi.object({

    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    course: joi.string(),
    phone: joi.string(),
    Gender: joi.string().valid(...['Male', 'Female']),
    password: joi.string().regex(/^[A-Za-z0-9]{6,}/)
    
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

  email: joi.string().email(),
  password: joi.string().min(6)

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