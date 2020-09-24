"use strict";
const middleware = require('./../Middlewares/auth');
const controller = require('./../controllers/AuthController');
const Router = require('express').Router();

Router.post('/signup', middleware.filterUserSignupAndUpdate, controller.creatUser );
Router.post('/login', middleware.filterLogin, controller.login );
Router.get('/logout', middleware.confirmToken, controller.logOut);



module.exports = Router;