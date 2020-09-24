"use strict";

/** Parameterized common api response methods  */
const commonMethods = {
  /** Api 200 response for successful request */
  successReturn: (res, data)=>{
    return res.status(200).json({success: true, data: data});
  },

  /** Api response for non successful request and customized error*/
  errorReturn: (res, message)=>{
    return res.status(200).json({success: false, Error: message});
  },

  /** Api response for 500 server error  */
  serverErrorReturn: (res)=>{
   return res.status(500).json({success: false, Error: 'Internal Server Error'});
  },

    /** Api response for not found request 404 */
  notFoundReturn: (res)=>{
    return res.status(404).json({success: false, Error: 'Page Not Found'});
  }

}

module.exports = commonMethods;