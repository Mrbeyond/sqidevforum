"use strict";
const middleware = require('./../Middlewares/auth');
const controller = require('./../controllers/AuthController');
const Router = require('express').Router();

Router.post('/auth', middleware.filterAuth, controller.authProcessor );
Router.get('/logout', middleware.confirmToken, controller.logOut);
Router.get('/reget_student', middleware.confirmToken, controller.getStudent);

Router.post('/update_student', middleware.confirmToken, controller.updateStudent);
Router.get('/and_get', (req, res)=>{
    return res.status(200).json({success: true, data:[
        {one:1, two:'2'},
        {one:1, two:'21'},
        {one:1, two:'22'},
        {one:1, two:'23'},
        {one:1, two:'24'},
        {one:1, two:'25'},
        {one:1, two:'26'},
        {one:1, two:'27'}
    ]});
})


// Router.post('/change_email', middleware.confirmToken, controller.changeEmail);
// Router.post('/change_password', middleware.confirmToken, controller.changePassword);
// Router.post('/change_phone_number', middleware.confirmToken, controller.changePhone);



module.exports = Router;