import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import { getAllPost } from "../../../../backend/controllers/post/post.controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getAllPost);
export default connectDB(handler);
