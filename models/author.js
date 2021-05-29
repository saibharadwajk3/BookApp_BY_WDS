const mongoose = require("mongoose");

//create schema

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

//Author can be thought as name of table and authorSchema is a column
module.exports = mongoose.model("Author", authorSchema);