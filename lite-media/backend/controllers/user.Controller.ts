import { NextApiRequest, NextApiResponse } from "next";
import { userInterface } from "../interfaces";
import postModel from "../models/post.model";
import userModel from "../models/user.model";
import { sendError } from "../utils/sendError";

export const findUserMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
) => {
    console.log({ beforequery: req.query });
    const user = await userModel.findById(req.query.id);
    if (user) next();
    else {
        console.log({ afterquery: req.query });
        return res.json({
            message: "User Not Found / Unauthenticated User",
            success: false,
        });
    }
};

export const getAllUser = async (
    _req: NextApiRequest,
    res: NextApiResponse
) => {
    const users = await userModel
        .find()
        .populate(["post", "follower", "following"]);
    return res.json({ users, success: true, message: "All Users" });
};

export const getSingleUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    console.log({ query: req.query });
    const user = await userModel
        .findById(req.query.id)
        .populate("post follower following");
    return res.json({ user, success: true, message: "user Found" });
};

export const getSingleUserPosts = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const user = (await userModel
        .findById(req.query.id)
        .select("post")) as userInterface;
    const postIds = Array.from(
        new Set(user.post.map((v: { _id: any }) => v._id))
    );
    const post = (
        await postModel
            .find({
                _id: { $in: [...postIds] },
            })
            .populate("user")
    ).reverse();
    return res.json({ post, success: true, message: "Post Found" });
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = req.body;
        console.log({ data });
        const user = new userModel(data);
        user.save((error, v) => {
            if (error) {
                console.error({ error });
                return res.json({ message: error.message, success: false });
            }
            return res.json({
                user: v,
                success: true,
                message: "User Created Successfully",
            });
        });
    } catch (error) {
        sendError(res, error as Error);
    }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
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

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await userModel.findByIdAndDelete(req.query.id);
        return res.json({
            user,
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
