const mongoose=require('mongoose')

const Schema= mongoose.Schema;

const supplierSchema=new Schema({
    name:{
        type:String
    }


});

const SupplierModel = mongoose.model('Supplier', supplierSchema);
module.exports = SupplierModel;