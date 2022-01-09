import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { findUserMiddleware } from "../../../backend/controllers/info.Controller";
import { getSuggestedUser } from "../../../backend/controllers/suggested.controller";
import connectDB from "../../../backend/db";
import { onError } from "../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getSuggestedUser);
export default connectDB(handler);
