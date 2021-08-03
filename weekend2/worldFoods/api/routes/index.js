const express = require("express");

const controllerCountry = require("../controllers/country.controller");
const controllerFood = require("../controllers/food.controller");
const controllerUsers = require("../controllers/users.controller");


const router = express.Router();


router.route("/countries")
    .get(controllerCountry.countriesgetAll)
    .post(controllerCountry.countriesAddOne);


router.route("/countries/:countryId")
    .get(controllerCountry.countriesgetOne)
    .put(controllerCountry.countriesFullUpdateOne)
    .patch(controllerCountry.countriesPartialUpdateOne)
    .delete(controllerCountry.countriesDeleteOne);

router.route("/countries/:countryId/foods")
    .get(controllerFood.foodsgetAll)
    .post(controllerFood.foodAddOne);

router.route("/countries/:countryId/foods/:foodId")
    .put(controllerFood.foodFullUpdateOne)
    .delete(controllerFood.foodDeleteOne);

router.route("/users")
    .post(controllerUsers.register);

router.route("/login")
    .post(controllerUsers.login);

module.exports = router;