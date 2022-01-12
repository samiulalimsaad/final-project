import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    getSingleUserInfo,
    updateUserInfo,
} from "../../../backend/controllers/info.Controller";
import { findUserMiddleware } from "../../../backend/controllers/user.Controller";
import connectDB from "../../../backend/db";
import { onError } from "../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getSingleUserInfo)
    .put(updateUserInfo);
export default connectDB(handler);
