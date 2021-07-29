const mongoose = require("mongoose");

const foodsSchema = new mongoose.Schema({
    name: String,
    cookingTime: Number,
    ingredients: String,
    directions: String
});

const countriesSchema = new mongoose.Schema({
    name: String,
    population : Number,
    foods: [foodsSchema]
});

mongoose.model("Country", countriesSchema, "foods");