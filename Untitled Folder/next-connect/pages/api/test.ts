import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../db/index";

const handler = nc<NextApiRequest, NextApiResponse>().get(
    (req: NextApiRequest, res: NextApiResponse) => {
        res.json({ query: req.query });
    }
);

export default connectDB(handler);
