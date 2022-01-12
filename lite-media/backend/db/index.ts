import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import commentModel from "../models/comment.model";
import postModel from "../models/post.model";
import userModel from "../models/user.model";

const { serverRuntimeConfig } = getConfig();

const t = {
    postModel,
    userModel,
    commentModel,
};

const connectDB =
    (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        console.log(req.url);
        await mongoose
            .connect(serverRuntimeConfig.DATABASE_URL as string)
            .catch((err) => console.log(err));
        console.log("Mongoose Connection Established");
        return handler(req, res);
    };

export default connectDB;
