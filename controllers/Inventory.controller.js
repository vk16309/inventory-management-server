const SECRET_KEY = process.env.SECRET_KEY || require('../server-config.json').server_secret || "JustSomethingSecret";
const InventoryModel = require('../models/Inventory.model');
const JWT = require('jsonwebtoken');
const CONTROLLER_NAME = 'InventoryController'

const AUTHORIZATION_HEADER_ERROR = {
    message:"Authorization header not provided"
}


const INVENTORY_NOT_FOUND_ERROR = {
    message: "Inventory not Found"
}

module.exports = {
/*
     get: function(req,res){

        console.log("Entering get function in " + CONTROLLER_NAME)
        
        // Check for a JWT token in the header
        if(!req.header('authorization')) {
           // sails.log.error('Authorization header not provided')
            return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
        }

        // If one exists, attempt to get the header data
        let token = req.header('authorization').split('Bearer ')[1]
        console.log(token)
        // If there's nothing after "Bearer", send an error
        if(!token) {
            sails.log.error('JWT token not provided in the authorization header')
            return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
        }

        getUserId(token,function(id){
            console.log(id)
            console.log('DB Query to find Inventory')
            InventoryModel
            .find()
            .exec(function(error,result){
            
                if (error){
                    console.log(error)
                    res.json(error)
                }

                console.log("Returning from get function in " + CONTROLLER_NAME)
                res.json(result)
            })
        })

        
    },

*/

    get: function(req,res){

        console.log("Entering get function in " + CONTROLLER_NAME)
        
        console.log('DB Query to find Inventory')
        InventoryModel
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

        InventoryModel
        .findOne({
            _id : req.param("inventoryId")
        })
        .exec(function(error,inventoryObject){

            if (error){
                console.log(error)
                res.status(404).send(error)
            }

            console.log(inventoryObject)

            if (!inventoryObject || inventoryObject == null){

                console.log("Inventory not found")
                res.status(404).send(INVENTORY_NOT_FOUND_ERROR)
            } 

            else{

                console.log("returning from getById function in " + CONTROLLER_NAME)
                res.json(inventoryObject)
            }
            
        })
    },

    post: function(req,res){

        console.log("Entering post function in " + CONTROLLER_NAME)
        console.log(req.body)
         // Check for a JWT token in the header
        if(!req.body.token) {
           // sails.log.error('Authorization header not provided')
            return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
        }

        // If one exists, attempt to get the header data
        let token = req.body.token.split('Bearer ')[1]
        console.log(token)
        // If there's nothing after "Bearer", send an error
        if(!token) {
            sails.log.error('JWT token not provided in the authorization header')
            return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
        }



        getUserId(token,function(id){
        console.log(id)
        var inventoryObject = {}
        if (req.body.name)
            inventoryObject.name = req.body.name
        if (req.body.status)
            inventoryObject.status = req.body.status
       // if(req.body.userid)
            inventoryObject.currentUser = id
        
        inventoryObject.type = req.body.type

        var inventory = new InventoryModel(inventoryObject)

        console.log('DB Query to create Inventory')
        inventory
        .save(function(error,newInventory){

            if (error){
                console.log(error)
                res.json(error)
            }

            console.log("Returning from post function in " + CONTROLLER_NAME)
            res.json({id : newInventory.id})

        })

        })

    } ,

    delete: function (req,res){
        const invenId =req.param("inventoryId")//req.body.inventoryId;
        console.log(invenId)
        
        InventoryModel.findByIdAndRemove(invenId)
            .then(()=>{
                console.log('Inventory DELETED');
                  res.json({'id':invenId})
            })
            .catch(( err)=>
                {console.log(err)
            res.json({"error":err})
        });
            

    },
    patch: function (req,res){
        const invenId =req.param("inventoryId")//req.body.inventoryId;
        console.log(invenId)

        var inventoryObject = {}
        if (req.body.name)
            inventoryObject.name = req.body.name
        if (req.body.status)
            inventoryObject.status = req.body.status
        if(req.body.type)
            inventoryObject.type = req.body.type
       // if(req.body.userid)
         //   inventoryObject.currentUser = req.body.userid
        
        InventoryModel.findByIdAndUpdate(invenId ,inventoryObject).then(()=>{


            console.log("Updated Inventory : ",inventoryObject);
            res.json({'id':invenId})
        })
        .catch((err)=>
        {
            console.log(err)
            res.json({"error":err})
        }
        )
                          
         
            

    },


}

function getUserId(token,cb){
    JWT.verify(token, SECRET_KEY, function (error, payload) {
        return cb(payload.id)
    })

}
