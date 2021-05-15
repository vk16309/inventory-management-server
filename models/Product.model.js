const mongoose = require('mongoose');
const InventoryModel = require('./Inventory.model');

const productSchema = new mongoose.Schema({
    status: {
      type: String,
      allowNull : true,
      isIn : ["active","deleted"],
      defaultsTo : "active"
    },
    
    name: {
      type: String,
      allowNull: true
    },

    currentInventory: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'InventoryModel'
    },
    description: {
        type: mongoose.Schema.Types.Mixed
    },

    quantity: {
        type: Number,
        min: 0
    },

    price: {
        type: Number,
        min: 0
    },

  });

  const ProductModel = mongoose.model('Product', productSchema);
  module.exports = ProductModel;