const path = require("path");
require("dotenv").config({ path: path.resolve(".env.local") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");

const app = express();

app.use(express.json(), cors());

app.get("/", (_, res) => {
    res.send(`<h1>Home Page</h1>`);
});

app.use("/user", userRoute);
app.use("/post", postRoute);

app.get("*", (_, res) => {
    res.send(`<h1>route not Found</h1>`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log(process.env.MONGODB_URL);
        console.log(`mongodb connected`);
    }).catch(e=>{
        console.error(e);
    });
    // mongoose.connect("mongodb://localhost:27017/test");
});
