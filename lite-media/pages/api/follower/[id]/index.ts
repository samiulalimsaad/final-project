import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getAllFollowers } from "../../../../backend/controllers/follower.controller";
import { findUserMiddleware } from "../../../../backend/controllers/user.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getAllFollowers);
export default connectDB(handler);
