const mongoose = require("mongoose");
//const path = require("path");
//create schema
//const bookImageBasePath = "uploads/bookCovers";
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    coverImage: {
        type: Buffer,
        required: true,
    },
    coverImageType: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author",
    },
});

bookSchema.virtual("coverImagePath").get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
    }
});

//Book can be thought as name of table and bookSchema is a column
module.exports = mongoose.model("Book", bookSchema);
//module.exports.bookImageBasePath = bookImageBasePath;