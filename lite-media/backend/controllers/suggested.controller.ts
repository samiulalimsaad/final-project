import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";

export const getSuggestedUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const allUsers = await userModel.find().select("_id");
    const user = await userModel.findById(req.query.id).select("following");

    const temp = allUsers.map((v) => {
        if (!user!.following.includes(v._id)) return v._id;
    });
    const pullUsers = temp.filter((v) => v).filter((v) => v !== req.query.id);
    const userIds = Array.from(new Set(pullUsers));
    const suggestedUser = await userModel
        .find({
            _id: { $in: [...userIds] },
        })
        .select("name.fullName profilePic following");
    return res.json({
        suggestedUser,
        success: true,
        message: "Suggested Users",
    });
};
