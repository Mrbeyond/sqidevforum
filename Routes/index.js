"use strict";

const Routers = require('express').Router();
const authRouter = require('./AuthRoute');

Routers.use(authRouter);

module.exports = Routers;