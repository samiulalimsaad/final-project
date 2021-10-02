const { Router } = require("express");
const { getAllUser, getSingleUser } = require("../controllers/user.Controller");

const userRoute = Router();

userRoute.get("/", getAllUser);

userRoute.get("/:id", getSingleUser);

userRoute.post("/", (req, res) => {
    res.send(`<h1>UserRoute Page</h1>`);
});

userRoute.put("/", (req, res) => {
    res.send(`<h1>UserRoute Page</h1>`);
});

userRoute.delete("/", (req, res) => {
    res.send(`<h1>UserRoute Page</h1>`);
});

module.exports = userRoute;
