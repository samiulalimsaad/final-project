const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

exports.getAllBookmarks = async (req, res) => {
    const bookmarks = await userModel
        .findById(req.params.id)
        .select("bookmark");
    return res.json({
        bookmarks: bookmarks.bookmark,
        success: true,
        message: "All Bookmarks",
    });
};

const isBookmark = (res) => {
    return res.json({
        success: false,
        message: "Only Bookmark Allow",
    });
};

exports.addBookmark = async (req, res) => {
    try {
        if (!req.body.bookmark) isBookmark(res);
        const data = {
            bookmark: [req.body.bookmark],
        };
        const user = await userModel.findByIdAndUpdate(
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
            message: "Bookmark Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeBookmark = async (req, res) => {
    try {
        if (!req.body.bookmark) isBookmark(res);
        const data = {
            bookmark: [req.body.bookmark],
        };
        const user = await userModel.findByIdAndUpdate(
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
            message: "Bookmark Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
