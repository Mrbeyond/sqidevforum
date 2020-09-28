"use strict";
const middleware = require('./../Middlewares/auth');
const controller = require('./../controllers/AuthController');
const Router = require('express').Router();

Router.post('/signup', middleware.filterStudentSignup, controller.creatUser );
Router.post('/login', middleware.filterLogin, controller.login );
Router.get('/logout', middleware.confirmToken, controller.logOut);
Router.post('/update_student', middleware.confirmToken, controller.updateStudent);
Router.post('/change_email', middleware.confirmToken, controller.changeEmail);
Router.post('/change_password', middleware.confirmToken, controller.changePassword);
Router.post('/change_phone_number', middleware.confirmToken, controller.changePhone);



module.exports = Router;