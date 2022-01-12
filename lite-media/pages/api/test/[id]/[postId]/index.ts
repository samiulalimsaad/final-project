import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../../../backend/db";
import { onError } from "../../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
}).get((req, res) => {
    res.json({ query: req.query });
});
export default connectDB(handler);
