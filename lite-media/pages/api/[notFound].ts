import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../backend/db/index";

const handler = nc<NextApiRequest, NextApiResponse>().get(
    (_req: NextApiRequest, res: NextApiResponse) => {
        res.send(
            `<h1 style="display: grid;place-items: center; justify-items: center; height: 100vh;width: 100vw;">Route Not Found
        </h1>`
        );
    }
);

export default connectDB(handler);
