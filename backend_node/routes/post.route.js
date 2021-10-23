const { Router } = require("express");
const {
    getAllPost,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostMiddleware,
} = require("../controllers/post.controller");

const { findUserMiddleware } = require("../controllers/user.Controller");

const postRoute = Router();

// followers
postRoute.get("/all/:id",findUserMiddleware, getAllPost);

postRoute.get("/:id", findUserMiddleware, getPostMiddleware, getSinglePost);

postRoute.post("/:id", findUserMiddleware, createPost);

postRoute.put("/:id", findUserMiddleware, getPostMiddleware, updatePost);

postRoute.delete("/:id", findUserMiddleware, getPostMiddleware, deletePost);

module.exports = postRoute;
