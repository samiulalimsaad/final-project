const postModel = require("../../models/post.model");
const userModel = require("../../models/user.model");
const { sendError } = require("../../utils/sendError");

exports.getPostMiddleware = async (req, res, next) => {
    const post = await postModel.findById(req.body.postId || req.params.postId);
    if (post) next();
    else return res.json({ message: "post Not Found", success: false });
};

exports.getAllPost = async (_req, res) => {
    const posts = await (await postModel.find().populate("user")).reverse();
    return res.json({ posts, success: true, message: "All posts" });
};

exports.getSinglePost = async (req, res) => {
    const post = await postModel.findById(req.body.postId).populate("user");
    return res.json({ post, success: true, message: "post Found" });
};

exports.createPost = async (req, res) => {
    try {
        const data = req.body;
        data.user = req.params.id;
        const post = new postModel(data);
        await post.save(async (error, v) => {
            if (error) {
                sendError(res, error);
            }
            const userPost = await userModel.findById(req.params.id);
            userPost.post.push(post);
            await userPost.save();
            return res.json({
                post: v,
                success: true,
                message: "post Created Successfully",
            });
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const data = req.body;
        const id = req.body.postId;
        delete data.postId;
        const post = await postModel.findByIdAndUpdate(
            id,
            {
                $set: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            post,
            success: true,
            message: "post Updated Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postModel.findOneAndDelete({
            _id: req.body.postId,
        });
        if (post) {
            return res.json({
                post,
                success: true,
                message: "post Deleted Successfully",
            });
        } else {
            return res.json({
                post,
                success: true,
                message: "post post not found",
            });
        }
    } catch (error) {
        sendError(res, error);
    }
};
