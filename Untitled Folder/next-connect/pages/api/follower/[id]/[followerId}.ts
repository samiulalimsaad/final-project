import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    addFollower,
    removeFollower,
} from "../../../../backend/controllers/follower.controller";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .post(addFollower)
    .delete(removeFollower);
export default connectDB(handler);
