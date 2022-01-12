import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    getActiveUser,
    setActive,
    setDeactive,
} from "../../../backend/controllers/activeUser.controller";
import { findUserMiddleware } from "../../../backend/controllers/user.Controller";
import connectDB from "../../../backend/db";
import { onError } from "../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getActiveUser)
    .post(setActive)
    .delete(setDeactive);
export default connectDB(handler);
