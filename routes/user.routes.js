const express = require('express');
const controller = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/login', controller.login);
userRouter.post('/register', controller.register);

module.exports = userRouter;