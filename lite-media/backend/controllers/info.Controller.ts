import { NextApiRequest, NextApiResponse } from "next";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const getSingleUserInfo = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const user = await userModel
        .findById(req.query.id)
        .select("email gender name bio contact");
    return res.json({ user, success: true, message: "user Found" });
};

export const updateUserInfo = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const data = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.query.id,
            {
                $set: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
