import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import {
    createPost,
    getPostMiddleware,
    updatePost,
} from "../../../../backend/controllers/post/post.controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .post(createPost)
    .put(getPostMiddleware, updatePost);
export default connectDB(handler);
