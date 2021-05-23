const mongoose=require('mongoose')
const PurchaseModel=require('.Purchases.model')

const Schema= mongoose.Schema;

const supplierSchema=new Schema({
    name:{
        type:String
    },
    purchases:[{
        type:Schema.Types.ObjectId,
        ref:'PurchaseModel'
    }]


});

const SupplierModel = mongoose.model('Supplier', supplierSchema);
module.exports = SupplierModel;