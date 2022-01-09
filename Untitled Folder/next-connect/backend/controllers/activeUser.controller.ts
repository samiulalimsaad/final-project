import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const getActiveUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const users = await userModel.find().select("_id active profilePic name");
    const activeUser = users.filter((v) => v._id !== req.query.id && v.active);
    return res.json({
        activeUser,
        success: true,
        message: "Suggested Users",
    });
};

export const setActive = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.query.id,
            {
                $set: {
                    active: true,
                },
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "User set Online Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

export const setDeactive = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.query.id,
            {
                $set: {
                    active: false,
                },
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "User set Offline Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
