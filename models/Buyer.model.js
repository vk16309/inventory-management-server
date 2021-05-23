const mongoose=require('mongoose')
const OrderModel=require('./Order.model')
const Schema= mongoose.Schema;

const buyerSchema=new Schema({
    name:{
        type:String
    },
    orders:[{
        type:Schema.Types.ObjectId,
        ref: 'OrderModel'
    }]


});
const BuyerModel = mongoose.model('Buyer', buyerSchema);
module.exports = BuyerModel;