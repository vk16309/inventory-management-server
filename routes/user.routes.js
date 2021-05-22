const express = require('express');
const controller = require('../controllers/user.controller');
const inventoryController = require('../controllers/Inventory.controller')
const productController = require('../controllers/Product.controller')
const userRouter = express.Router();

userRouter.post('/login', controller.login);
userRouter.post('/register', controller.register);
userRouter.get('/', controller.test);

userRouter.get('/Inventory', inventoryController.get);
userRouter.post('/Inventory', inventoryController.post);
userRouter.get('/Inventory/:inventoryId', inventoryController.getById);
//userRouter.delete('/Inventory/:inventoryId', inventoryController.delete);
//userRouter.get('/Inventory/:inventoryId', inventoryController.getById);

userRouter.get('/Product', productController.get);
userRouter.post('/Product', productController.post);
userRouter.get('/Product/:productId', productController.getById);
//userRouter.delete('/Product/:productId', productController.delete);


module.exports = userRouter;
