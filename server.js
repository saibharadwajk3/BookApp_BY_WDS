if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParse = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const indexRouter = require("./routes/index");
//author rout
const authorRouter = require("./routes/authors");
//book route
const bookRouter = require("./routes/books");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ limit: "10mb", extended: false }));

//database
mongoose.connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongoDB"));

//routes

//index rout
app.use("/", indexRouter);
//authors rout ==> authors/(shows all authors)  and authors/new(displays new author)
app.use("/authors", authorRouter);
//book rout
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () =>
    console.log("server running on port 3000")
);