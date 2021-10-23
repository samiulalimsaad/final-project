const { Router } = require("express");
const {
    getAllBookmarks,
    addBookmark,
} = require("../controllers/bookmark.controller");
const { getSuggestedUser } = require("../controllers/suhhested.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const suggestedUserRoute = Router();
// followers
suggestedUserRoute.get("/:id", findUserMiddleware, getSuggestedUser);

module.exports = suggestedUserRoute;
