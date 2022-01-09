import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const getAllFollowing = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const followings = await userModel
        .findById(req.query.id)
        .select("following")
        .populate("following");
    return res.json({
        followings: followings.following,
        success: true,
        message: "All followings",
    });
};

const isFollowing = (res: NextApiResponse) => {
    return res.json({
        success: false,
        message: "Only Following Allow",
    });
};

export const addFollowing = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.followingId) isFollowing(res);
        const data = {
            following: [req.query.followingId],
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
            message: "Following Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

export const removeFollowing = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.followingId) isFollowing(res);
        const data = {
            following: [req.query.followingId],
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
            message: "Following Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
