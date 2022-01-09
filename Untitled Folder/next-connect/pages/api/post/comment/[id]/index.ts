import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../../../backend/controllers/info.Controller";
import {
    addComment,
    getComments,
} from "../../../../../backend/controllers/post/comment.controller";
import connectDB from "../../../../../backend/db";
import { onError } from "../../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getComments)
    .post(addComment);
export default connectDB(handler);
