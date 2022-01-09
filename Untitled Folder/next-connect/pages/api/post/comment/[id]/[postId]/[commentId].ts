import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../../../../backend/controllers/info.Controller";
import { removeComment } from "../../../../../../backend/controllers/post/comment.controller";
import { getPostMiddleware } from "../../../../../../backend/controllers/post/post.controller";
import connectDB from "../../../../../../backend/db";
import { onError } from "../../../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware, getPostMiddleware)
    .delete(removeComment);
export default connectDB(handler);
