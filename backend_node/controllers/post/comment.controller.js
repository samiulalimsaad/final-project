const postModel = require("../../models/post.model");
const { sendError } = require("../utils/sendError");

exports.getAllComments = async (req, res) => {
    const comments = await postModel
        .findById(req.params.id)
        .select("comment").populate("comment");
    return res.json({
        comments: comments.comment,
        success: true,
        message: "All comments",
    });
};

const isComment = (res) => {
    return res.json({
        success: false,
        message: "Only comment Allow",
    });
};

exports.addComment = async (req, res) => {
    try {
        if (!req.body.comment) isComment(res);
        const data = {
            comment: [req.body.comment],
        };
        const user = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "comment Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeComment = async (req, res) => {
    try {
        if (!req.body.comment) isComment(res);
        const data = {
            comment: [req.body.comment],
        };
        const user = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "comment Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
