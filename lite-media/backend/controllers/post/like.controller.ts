import { NextApiRequest, NextApiResponse } from "next";
import postModel from "../../models/post.model";
import { sendError } from "../../utils/sendError";

export const getAllLikes = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const likes = await postModel
        .findById(req.body.postId)
        .select("like")
        .populate("like");
    return res.json({
        likes: likes,
        success: true,
        message: "All likes",
    });
};

const isLike = (res: NextApiResponse) => {
    return res.json({
        success: false,
        message: "Only like Allow",
    });
};

export const addLike = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.like) isLike(res);
        const data = {
            like: [req.body.like],
        };
        const post = await postModel.findByIdAndUpdate(
            req.body.postId,
            {
                $push: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            post,
            success: true,
            message: "like Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

export const removeLike = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) isLike(res);
        const data = {
            like: [req.query.id],
        };
        const post = await postModel.findByIdAndUpdate(
            req.query.postId,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            post,
            success: true,
            message: "like Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
