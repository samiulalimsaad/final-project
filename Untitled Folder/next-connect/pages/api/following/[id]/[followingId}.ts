import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    addFollowing,
    removeFollowing,
} from "../../../../backend/controllers/following.controller";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .post(addFollowing)
    .delete(removeFollowing);
export default connectDB(handler);
