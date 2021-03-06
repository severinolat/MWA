const mongoose = require("mongoose");
const {objectId} = require("mongodb");

const Country = mongoose.model("Country");

module.exports.countriesgetAll = function(req,res){
    console.log("Json request received");
    let count =5;
    let offset =0;

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    Country.find().skip(offset).limit(count).exec(function(err, countries){
        console.log("List of countries",countries);
        res.status(200).json(countries);
    });
}

module.exports.countriesgetOne = function(req,res){
    console.log("Get One countries");
    const countryId = req.params.countryId;
    Country.findById(countryId).exec(function(err,country){
        res.status(200).json(country);
    })
}


module.exports.countriesAddOne = function(req,res){
    console.log("AddOne country",req.body);

        const newCountry = {
            name : req.body.name,
            population: parseFloat(req.body.population),

        };
        Country.create(newCountry, function(err,createResponse){
            console.log("ici1",newCountry);
            const response = {
                status : 201,
                message : createResponse
            }
            if(err){
                response.status = 500;
                response.message = err;
            }else{
                response.message = "Country saved";
            }

            res.status(response.status).json(response.message);
        })


}


module.exports.countriesFullUpdateOne = function(req,res){
    console.log("Get One country with full update");
    const countryId = req.params.countryId;

    Country.findById(countryId).exec(function(err,country){
        const response = {
            status:204,
            message:country
        }
        console.log("the country",country);
        if(err){
            console.log("Error finding country");
            res.status =500;
            res.message = err;

        }else if(!country){
            response.status = 404;
            response.message = {message: "country with given ID is not found"}

        }

        if(response.status !== 204){
            res.status(response.status).json(response.message);
        } else{
            //this is where we update the country
            country.name =  req.body.name;
            country.population =  parseInt(req.body.population);

            country.save(function(err, updatedCountry){
                if(err){
                    response.status = 500;
                    response.message = err;
                }

                res.status(response.status).json(response.message);

            });
        }


    })


}



module.exports.countriesPartialUpdateOne = function(req,res){
    console.log("Get One countries");
    const countryId = req.params.countryId;
    Country.findById(countryId).exec(function(err,country){
        console.log("The",country);
        const response = {
            status:204,
            message:country
        }
        if(err){
            console.log("Error finding country");
            res.status =500;
            res.message = err;

        }else if(!country){
            response.status = 404;
            response.message = {message: "country with given ID is not found"}

        }
        console.log("her");
        if(response.status !== 204){
            console.log("her2",response.status);
            res.status(response.status).json(response.message);
        } else{


            if(country.name){country.name =  req.body.name;}

            if(country.population){country.population = parseInt(req.body.population);}


            country.save(function(err, updatedCountry){
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);

            })
        }
       // res.status(response.status).json(response.message);

    })


}



module.exports.countriesDeleteOne = function(req,res){
    console.log("Get One country");
    const countryId = req.params.countryId;
    Country.findByIdAndDelete(countryId).exec(function(err,country){
        const response = {
            status:200,
            message:country
        }
        if(err){
            console.log("Error finding country");
            res.status =500;
            res.message = err;

        }else if(!country){
            response.status = 404;
            response.message = {message: "country with given ID is not found"}

        }
        res.status(response.status).json(response.message);

    })


}
