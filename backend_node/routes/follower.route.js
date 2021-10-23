const { Router } = require("express");
const {
    getAllFollowers,
    addFollower,
    removeFollower,
} = require("../controllers/follower.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const followerRoute = Router();
// followers
followerRoute.get("/:id", findUserMiddleware, getAllFollowers);

followerRoute.post("/:id", findUserMiddleware, addFollower);

followerRoute.delete("/:id", findUserMiddleware, removeFollower);

module.exports = followerRoute;
