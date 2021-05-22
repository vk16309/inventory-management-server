
const ProductModel = require('../models/Product.model');
const CONTROLLER_NAME = 'ProductController'

const Product_NOT_FOUND_ERROR = {
    message: "Product not Found"
}

module.exports = {
    get: function(req,res){

        console.log("Entering get function in " + CONTROLLER_NAME)
        
        console.log('DB Query to find Product')
        ProductModel
        .find()
        .exec(function(error,result){
        
            if (error){
                console.log(error)
                res.json(error)
            }

            console.log("Returning from get function in " + CONTROLLER_NAME)
            res.json(result)
        })
    },

    getById: function(req,res){

        console.log("Entering in getById function in " + CONTROLLER_NAME)

        ProductModel
        .findOne({
            _id : req.param("productId")
        })
        .exec(function(error,productObject){

            if (error){
                console.log(error)
                res.status(404).send(error)
            }

            console.log(productObject)

            if (!productObject || productObject == null){

                console.log("Product not found")
                res.status(404).send(PRODUCT_NOT_FOUND_ERROR)
            } 

            else{

                console.log("returning from getById function in " + CONTROLLER_NAME)
                res.json(productObject)
            }
            
        })
    },

    post: function(req,res){

        console.log("Entering post function in " + CONTROLLER_NAME)

        var productObject = {}
        if (req.body.name)
            productObject.name = req.body.name
        if (req.body.status)
            productObject.status = req.body.status
        if (req.body.description)
            productObject.description=re1.body.description
        if (req.body.quantity)
            productObject.quantity=req.body.quantity
        if (req.body.price)
            productObject.price=req.body.price
            
        
        

        var product = new ProductModel(productObject)

        console.log('DB Query to create Product')
        product
        .save(function(error,newProduct){

            if (error){
                console.log(error)
                res.json(error)
            }

            console.log("Returning from post function in " + CONTROLLER_NAME)
            res.json({id : newProduct.id})

        })
    },
/*
    delete: function (req,res){
        const prodId =req.body.productId;
        ProductModel.findByIdAndRemove(prodId)
            .then(()=>{
                console.log('PRODUCT DELETED');
            })
            .catch(err=> console.log(err));

    }
    */
}
