const { Router } = require("express");
const { getAllBookmarks, addBookmark } = require("../controllers/bookmark.controller");
const {
    removeFollower,
} = require("../controllers/follower.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const bookmarkRoute = Router();

bookmarkRoute.get("/:id", findUserMiddleware, getAllBookmarks);

bookmarkRoute.post("/:id", findUserMiddleware, addBookmark);

bookmarkRoute.delete("/:id", findUserMiddleware, removeFollower);

module.exports = bookmarkRoute;
