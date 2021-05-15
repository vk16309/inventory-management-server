const mongoose=require('mongoose')

const Schema= mongoose.Schema;

const buyerSchema=new Schema({
    name:{
        type:String
    }


});
const BuyerModel = mongoose.model('Buyer', buyerSchema);
module.exports = BuyerModel;