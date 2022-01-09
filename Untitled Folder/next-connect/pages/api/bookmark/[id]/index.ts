import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getAllBookmarks } from "../../../../backend/controllers/bookmark.controller";
import { findUserMiddleware } from "../../../../backend/controllers/info.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getAllBookmarks);
export default connectDB(handler);
