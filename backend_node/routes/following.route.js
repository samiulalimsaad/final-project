const { Router } = require("express");
const {
    getAllFollowing,
    addFollowing,
    removeFollowing,
} = require("../controllers/following.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const followingRoute = Router();

// followers
followingRoute.get("/:id", findUserMiddleware, getAllFollowing);

followingRoute.put("/:id", findUserMiddleware, addFollowing);

followingRoute.delete("/:id", findUserMiddleware, removeFollowing);

module.exports = followingRoute;
