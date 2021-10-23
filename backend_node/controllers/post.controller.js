const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

exports.getPostMiddleware = async (req, res, next) => {
    console.log({ userId: req.params });
    const post = await postModel.findById(req.body.postId);
    if (post) next();
    else return res.json({ message: "post Not Found", success: false });
};

exports.getAllPost = async (_req, res) => {
    const posts = await postModel.find().populate("user");
    return res.json({ posts, success: true, message: "All posts" });
};

exports.getSinglePost = async (req, res) => {
    console.log({ userId: req.params });
    const post = await postModel.findById(req.body.postId).populate("user");
    return res.json({ post, success: true, message: "post Found" });
};

exports.createPost = async (req, res) => {
    try {
        const data = req.body;
        data.user = req.params.id;
        console.log(data);
        const post = new postModel(data);
        console.log(post);
        await post.save(async (error, v) => {
            if (error) {
                console.error({ error });
                return res.json({ message: error.message, success: false });
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
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        console.error({ errors });
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const data = req.body;
        const id = req.body.postId;
        console.log(data);
        delete data.postId;
        console.log(id);
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
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        console.error({ errors });
        return res.json({ message: JSON.stringify(errors), success: true });
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
        console.error({ error });
        return res.json({ message: error.message, success: false });
    }
};
