import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const connectDB =
    (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        console.log(serverRuntimeConfig.DATABASE_URL);
        await mongoose
            .connect(serverRuntimeConfig.DATABASE_URL as string)
            .catch((err) => console.log(err));
        console.log("Mongoose Connection Established");
        return handler(req, res);
    };

export default connectDB;
