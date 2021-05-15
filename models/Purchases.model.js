const mongoose=require('mongoose');
const { schema } = require('./Product.model');
const ProductModel=require('./Product.model')
const SupplierModel=require('./Supplier.model')

const Schema= mongoose.Schema;

const purchasesSchema=new Schema({
    quatityBought: {
        type:Number,
        required: true,
        min: 1
        
    },
    purchaseDate:{
        type:Date

    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'ProductModel'
    },
    supplier:{
        type:Schema.Types.ObjectId,
        ref:'SupplierModel'
    }

});
const PurchasesModel = mongoose.model('Purchases', purchasesSchema);
module.exports = PurchasesModel;