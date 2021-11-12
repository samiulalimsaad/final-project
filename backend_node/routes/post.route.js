const { Router } = require("express");
const {
    getAllPost,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostMiddleware,
} = require("../controllers/post/post.controller");

const { findUserMiddleware } = require("../controllers/user.Controller");

const postRoute = Router();

postRoute.get("/all/:id",findUserMiddleware, getAllPost);
postRoute.get("/:id", findUserMiddleware, getPostMiddleware, getSinglePost);
postRoute.post("/:id", findUserMiddleware, createPost);
postRoute.put("/:id", findUserMiddleware, getPostMiddleware, updatePost);
postRoute.delete("/:id", findUserMiddleware, getPostMiddleware, deletePost);



postRoute.get("/:id/like", findUserMiddleware, getPostMiddleware, getSinglePost);
postRoute.post("/:id/like", findUserMiddleware, getPostMiddleware, createPost);
postRoute.delete("/:id/like", findUserMiddleware, getPostMiddleware, deletePost);



postRoute.get("/:id/comment", findUserMiddleware, getPostMiddleware, getSinglePost);
postRoute.post("/:id/comment", findUserMiddleware, createPost);
postRoute.put("/:id/comment", findUserMiddleware, getPostMiddleware, updatePost);
postRoute.delete("/:id/comment", findUserMiddleware, getPostMiddleware, deletePost);



module.exports = postRoute;
