import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import {
    addLike,
    removeLike,
} from "../../../../backend/controllers/post/like.controller";
import { getPostMiddleware } from "../../../../backend/controllers/post/post.controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware, getPostMiddleware)
    .post(addLike)
    .delete(removeLike);
export default connectDB(handler);
