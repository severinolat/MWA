const mongoose = require('mongoose');
const {objectId} = require("mongodb");
const Country = mongoose.model("Country");


const _addFood = function(req, res, country){

    const newFood = {
        name : req.body.name,
        cookingTime : parseInt(req.body.cookingTime),
        ingredients : req.body.ingredients,
        directions : req.body.directions
    }
    country.foods.push(newFood);

    country.save(function(err, updatedCountry){
        const response = {
            status:204,
            message : updatedCountry
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = updatedCountry;
        }
        res.status(response.status).json(response.message);

    })

};



module.exports.foodsgetAll = function(req,res){
    console.log("country foods received");
    const countryId = req.params.countryId;


    Country.findById(countryId).select("foods").exec(function(err, country){
        console.log("List of country foods",country);
        res.status(200).json(country.foods);
    });
};

module.exports.foodGetOne = function(req,res){
    const countryId = req.params.countryId;
    const foodId = req.params.foodId;
    console.log("get countryId= "+countryId+" foodid= "+foodId);
    Country.findById(countryId).select("foods").exec(function(err,country){
       const food = country.foods.id(foodId);
       console.log(food);
       res.status(200).json(food);
   });
};


module.exports.foodAddOne = function (req, res) {
    console.log("Add one food");
    const countryId = req.params.countryId;
    Country.findById(countryId).exec(function(err, country){
        const response = {
            status: 204,
            message: country
        }
        if (err){
            response.status = 500,
            response.message = err;
        } else if (!country){
            console.log("Error ading food");
            response.status = 404,
            response.message = {"message": "country ID not found"};
        } 
        if (country) {
            _addFood(req, res, country);
        } else{
            res.status(response.status).json(response.message);
        }
    })

};


module.exports.foodFullUpdateOne = function(req, res){
    console.log("Get one country request received");

    const countryId = req.params.countryId;
    const foodId = req.params.foodId;


    Country.findById(countryId).exec(function(err, country){
        const response = {
            status: 204,
            message: country
        }
        if (err) {
            console.log("country not updated");
            response.status = 500;
            response.message = err;
        } else if (!country){
            response.status = 404;
            response.message = { "message": "country not found" }
        } if (country) {
            const food = country.foods.id(foodId);
            if(food){
                const foodIndex = country.foods.indexOf(food);

                country.foods[foodIndex] = {
                    _id : food._id,
                    name : req.body.name,
                    cookingTime : parseInt(req.body.cookingTime),
                    ingredients : req.body.ingredients,
                    directions : req.body.directions
                }

                country.save(function(err, updatedCountry){
                    const response = {
                        status : 204,
                        message : updatedCountry
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);

                })
            }else {
                res.status(404).json({"messag": "Food not found."});

            }


            //ph





        }
    })
}




module.exports.foodDeleteOne = function(req, res){
    console.log("Delete request received");

    const countryId = req.params.countryId;
    const foodId = req.params.foodId;
    Country.findById(countryId).exec(function(err, country){
        const response = {
            status: 204,
            message: country
        }
        if (err) {
            console.log("food not deleted");
            response.status = 500;
            response.message = err;
        } else if (!country){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } 
        if (country) {
            const food = country.foods.id(foodId);

            if(food){
                var foodIndx = country.foods.indexOf(food);

                country.foods.splice(foodIndx, 1);

                country.save(function(err, updatedCountry){
                    const response = {
                        status : 204,
                        message : updatedCountry
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }

                    res.status(response.status).json(response.message);
                });
            }else {
                res.status(400).json({"message" : "food not found"});

            }
        }
        //res.status(response.status).json(response.message);
    })
}; 