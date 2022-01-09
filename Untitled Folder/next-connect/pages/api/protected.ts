import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getConfig from "next/config";
import connectDB from "../../db/index";

const { serverRuntimeConfig } = getConfig();

interface decodedInterface {
    name: String;
    id: String;
}

const auth = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, serverRuntimeConfig.JWT_SECRETE_KEY);
        const { name, id } = decoded;
        req.name = name;
        req.userId = id;
        next();
    } catch (error) {
        res.status(400).json({ message: "authentication Error", success: false });
    }
};

const handler = nc<NextApiRequest, NextApiResponse>()
    .use(auth)
    .get((req, res) => {
        res.json({ message: "hello", success: true });
    });

export default connectDB(handler);
