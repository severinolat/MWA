const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }
});

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year : Number,
    rate : {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: [String],
    publisher: publisherSchema,
    review: [reviewSchema]
});

//compile the model ( convert scheme to mongoose model)
mongoose.model("Game", gamesSchema, "games");