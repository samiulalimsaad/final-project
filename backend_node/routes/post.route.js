const { Router } = require("express");
const {
    getAllComments,
    addComment,
    removeComment,
} = require("../controllers/post/comment.controller");
const {
    getAllLikes,
    addLike,
    removeLike,
} = require("../controllers/post/like.controller");
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

postRoute.get("/all/:id", findUserMiddleware, getAllPost);
postRoute.get("/:id/:postId", findUserMiddleware, getPostMiddleware, getSinglePost);
postRoute.post("/:id", findUserMiddleware, createPost);
postRoute.put("/:id", findUserMiddleware, getPostMiddleware, updatePost);
postRoute.delete("/:id", findUserMiddleware, getPostMiddleware, deletePost);

postRoute.get("/:id/like", findUserMiddleware, getPostMiddleware, getAllLikes);
postRoute.post("/:id/like", findUserMiddleware, getPostMiddleware, addLike);
postRoute.delete(
    "/:id/like/:postId",
    findUserMiddleware,
    getPostMiddleware,
    removeLike
);

postRoute.get(
    "/:id/comment",
    findUserMiddleware,
    getPostMiddleware,
    getAllComments
);
postRoute.post("/:id/comment", findUserMiddleware, addComment);
postRoute.put(
    "/:id/comment",
    findUserMiddleware,
    getPostMiddleware,
    updatePost
);
postRoute.delete(
    "/:id/comment/:postId",
    findUserMiddleware,
    getPostMiddleware,
    removeComment
);

module.exports = postRoute;
