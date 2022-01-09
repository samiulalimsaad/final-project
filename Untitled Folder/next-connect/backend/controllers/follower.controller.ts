import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const getAllFollowers = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const followers = await userModel
        .findById(req.query.id)
        .select("follower")
        .populate("follower");
    return res.json({
        followers: followers.follower,
        success: true,
        message: "All followers",
    });
};

const isFollower = (res: NextApiResponse) => {
    return res.json({
        success: false,
        message: "Only Follower Allow",
    });
};

export const addFollower = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.followerId) isFollower(res);
        const data = {
            follower: [req.query.followerId],
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
            message: "Follower Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

export const removeFollower = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        if (!req.query.followerId) isFollower(res);
        const data = {
            follower: [req.query.followerId],
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
            message: "Follower Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
