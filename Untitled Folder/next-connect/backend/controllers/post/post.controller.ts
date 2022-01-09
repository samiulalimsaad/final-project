import { NextApiRequest, NextApiResponse } from "next";
import postModel from "../../models/post.model";
import userModel from "../../models/user.model";
import { sendError } from "../../utils/sendError";

export const getPostMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
) => {
    const post = await postModel.findById(req.body.postId || req.query.postId);
    if (post) next();
    else return res.json({ message: "post Not Found", success: false });
};

export const getAllPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const posts = (await postModel.find().populate("user")).reverse();
    return res.json({ posts, success: true, message: "All posts" });
};

export const getSinglePost = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const post = await postModel
        .findById(req.query.postId)
        .populate("user comments comments.user")
        .exec(async (error, v) => {
            if (error) {
                sendError(res, error);
            }
            return res.json({ post: v, success: true, message: "post Found" });
        });
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = req.body;
        data.user = req.query.id;
        const post = new postModel(data);
        post.save(async (error, v) => {
            if (error) {
                sendError(res, error);
            }
            const userPost = await userModel.findById(req.query.id);
            userPost!.post.push(post);
            await userPost!.save();
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

export const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
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

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const singlePost = await postModel
            .findById(req.query.postId)
            .populate("user");
        if (singlePost.user._id === req.query.id) {
            const post = await postModel.findOneAndDelete({
                _id: req.query.postId,
            });
            if (post) {
                return res.json({
                    post,
                    success: true,
                    message: "post Deleted Successfully",
                });
            } else {
                return res.json({
                    success: false,
                    message: "post not found",
                });
            }
        } else {
            return res.json({
                success: false,
                message: "unable to delete post",
            });
        }
    } catch (error) {
        sendError(res, error);
    }
};
