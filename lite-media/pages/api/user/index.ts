import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { createUser } from "../../../backend/controllers/user.Controller";
import connectDB from "../../../backend/db";
import { onError } from "../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
}).post(createUser);
export default connectDB(handler);
