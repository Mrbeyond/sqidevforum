"use strict";

const joi = require('joi');

/** Basic payload schema confrimed and put to test here */
const formValidators = {

  authValidators: joi.object({

    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    // course: joi.string().required(),
    // phone: joi.string().required(),
    // gender: joi.string().valid(...['Male', 'Female']).required(),
    password: joi.string().regex(/^[A-Za-z0-9]{6,}/).required()

  }),

  /** This method puts the user schema payload to test
   * it will be called inside middleware for users signup and update
   */
  testAuth: async(payload)=>{
    try {
      await formValidators.authValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e)
     return false;
    }
  },


  basicUpdateValidators: joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    course: joi.string().required(),
    gender: joi.string().valid(...['Male', 'Female']).required()

  }),

  testBasicUpdate: async(payload)=>{
    try {
      await formValidators.basicUpdateValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  changeEmailValidators: joi.object({

    email: joi.string().email().required(),
    
  }),

  testChangeEmail: async(payload)=>{
    try {
      await formValidators.changeEmailValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  changePasswordValidators: joi.object({

    password: joi.string().regex(/^[A-Za-z0-9]{6,}/).required()
    
  }),

  testChangePassword: async(payload)=>{
    try {
      await formValidators.changePasswordValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  changePhoneValidators: joi.object({

    phone: joi.string().required()
    
  }),

  testChangePhone: async(payload)=>{
    try {
      await formValidators.changePhoneValidators.validateAsync(payload);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  

}

module.exports = formValidators;

