import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const getAllBookmarks = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const bookmarks = await userModel
        .findById(req.query.id)
        .select("bookmark")
        .populate({
            path: "bookmark",
            populate: [
                {
                    path: "user",
                    model: "User",
                },
            ],
        });

    return res.json({
        bookmarks,
        success: true,
        message: "All Bookmarks",
    });
};

const isBookmark = (res: NextApiResponse) => {
    return res.json({
        success: false,
        message: "Only Bookmark Allow",
    });
};

export const addBookmark = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.bookmarkId) isBookmark(res);
        const data = {
            bookmark: [req.query.bookmarkId],
        };
        const user = await userModel.findByIdAndUpdate(
            req.query.id,
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

export const removeBookmark = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.bookmarkId) isBookmark(res);
        const data = {
            bookmark: [req.query.bookmarkId],
        };
        const user = await userModel.findByIdAndUpdate(
            req.query.id,
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
