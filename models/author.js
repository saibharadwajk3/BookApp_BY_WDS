const mongoose = require("mongoose");
const Book = require("./book");

//create schema

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

authorSchema.pre("remove", function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err);
        } else if (books.length > 0) {
            next(new Error("This Author has book associated"));
        } else {
            next();
        }
    });
});

//Author can be thought as name of table and authorSchema is a column
module.exports = mongoose.model("Author", authorSchema);