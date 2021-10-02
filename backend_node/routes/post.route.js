const { Router } = require("express");

const postRoute = Router();

postRoute.get("/", (req, res) => {
    res.send(`<h1>post Route Page</h1>`);
});

postRoute.get("/:id", (req, res) => {
    res.send(`<h1>post Route Page</h1>`);
});

postRoute.post("/", (req, res) => {
    res.send(`<h1>post Route Page</h1>`);
});

postRoute.put("/", (req, res) => {
    res.send(`<h1>post Route Page</h1>`);
});

postRoute.delete("/", (req, res) => {
    res.send(`<h1>post Route Page</h1>`);
});

module.exports = postRoute;
