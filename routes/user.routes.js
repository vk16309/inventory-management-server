const express = require('express');
const controller = require('../controllers/user.controller');
const inventoryController = require('../controllers/Inventory.controller')
const userRouter = express.Router();

userRouter.post('/login', controller.login);
userRouter.post('/register', controller.register);
userRouter.get('/', controller.test);
userRouter.get('/Inventory', inventoryController.get);
userRouter.post('/Inventory', inventoryController.post);


module.exports = userRouter;
