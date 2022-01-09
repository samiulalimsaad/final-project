import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../backend/controllers/info.Controller";
import { createUser } from "../../../backend/controllers/user.Controller";
import connectDB from "../../../backend/db";
import { onError } from "../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .post(createUser);
export default connectDB(handler);
