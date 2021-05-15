
const InventoryModel = require('../models/Inventory.model');
const CONTROLLER_NAME = 'InventoryController'

module.exports = {
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

    post: function(req,res){

        console.log("Entering post function in " + CONTROLLER_NAME)

        var inventoryObject = {}
        if (req.body.name)
            inventoryObject.name = req.body.name
        if (req.body.status)
            inventoryObject.status = req.body.status
        
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
    } 
}
