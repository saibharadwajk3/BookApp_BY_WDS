if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//database
mongoose.connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongoDB"));

//routes
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () =>
    console.log("server running on port 4000")
);