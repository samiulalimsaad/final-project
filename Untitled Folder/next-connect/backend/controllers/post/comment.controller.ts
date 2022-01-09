import { NextApiRequest, NextApiResponse } from "next";
import { commentInterface } from "../../interfaces";
import commentModel from "../../models/comment.model";
import postModel from "../../models/post.model";
import { sendError } from "../../utils/sendError";

export const getComments = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const postComments = await postModel
        .findById(req.query.postId)
        .select("comments");
    const commentsIds = Array.from(
        new Set(postComments!.comments.map((v: commentInterface) => v._id))
    );
    const comment = await commentModel
        .find({
            _id: { $in: [...commentsIds] },
        })
        .populate("user");
    return res.json({
        comment,
        success: true,
        message: "Comment Found",
    });
};

export const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = req.body;
        data.user = req.query.id;
        const comment = new commentModel(data);
        comment.save(async (error, v) => {
            if (error) {
                sendError(res, error);
            }
            const commentPost = await postModel.findById(req.query.postId);
            commentPost!.comments.push(comment);
            await commentPost!.save();
            return res.json({
                comment: v,
                commentPost,
                success: true,
                message: "Comment Created Successfully",
            });
        });
    } catch (error) {
        sendError(res, error);
    }
};

export const removeComment = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const comment = await commentModel.findByIdAndDelete(
            req.query.commentId
        );
        const data = {
            comments: [comment!._id],
        };
        await postModel.findByIdAndUpdate(
            req.query.postId,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            comment,
            success: true,
            message: "Comment Deleted Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
