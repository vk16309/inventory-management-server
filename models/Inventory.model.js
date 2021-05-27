const mongoose = require('mongoose');
const ProductModel = require('./Product.model');
const UserModel = require('./user.model');


const inventorySchema = new mongoose.Schema({
    products:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductModel'
    }],
    status: {
      type: String,
      allowNull : true,
      enum: {
        values: ["active","deleted"],
        message: '{VALUE} is not supported'
      },
      default : "active"
    },
    currentUser: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
    },
    name: {
      type: String,
      allowNull: true
    },
    type: {
      type: String,
      required: true
    }
  });

  const InventoryModel = mongoose.model('Inventory', inventorySchema);
  module.exports = InventoryModel;