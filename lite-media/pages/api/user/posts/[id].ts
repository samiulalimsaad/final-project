import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    findUserMiddleware,
    getSingleUserPosts,
} from "../../../../backend/controllers/user.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getSingleUserPosts);
export default connectDB(handler);
