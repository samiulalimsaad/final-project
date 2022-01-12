import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    addBookmark,
    removeBookmark,
} from "../../../../../backend/controllers/bookmark.controller";
import { findUserMiddleware } from "../../../../../backend/controllers/user.Controller";
import connectDB from "../../../../../backend/db";
import { onError } from "../../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .post(addBookmark)
    .delete(removeBookmark);
export default connectDB(handler);
