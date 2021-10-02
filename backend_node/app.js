const path = require("path");
require("dotenv").config({ path: path.resolve(".env.local") });
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<h1>Home Page</h1>`);
});

app.use("/user", userRoute);
app.use("/post", postRoute);

app.get("*", (req, res) => {
    res.send(`<h1>route not Found</h1>`);
});

const PORT = process.env.PORT || 8080;
console.log(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // mongoose.connect("mongodb://localhost:27017/test");
});
