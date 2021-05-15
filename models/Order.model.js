const mongoose=require('mongoose')
const ProductModel=require('./Product.model')

const Schema= mongoose.Schema;

const orderSchema=new Schema({
    quatityRequired: {
        type:Number,
        required: true,
        min: 1
        
    },
    status:{
        type:String,
        required:true,
        enum: ['Completed','Pending','Rejected'],
        default:'Pending'

    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'ProductModel'
    }

});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;