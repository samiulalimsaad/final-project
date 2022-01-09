import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const connectDB =
    (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
        } else {
            mongoose.connect(serverRuntimeConfig.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
        }
        return handler(req, res);
    };

export default connectDB;
