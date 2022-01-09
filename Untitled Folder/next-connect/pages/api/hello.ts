import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../db/index";
import getRequestHandler from "../../requestHandler/getReq";

interface CustomNextApiRequest extends NextApiRequest {
    message1: String;
    message2: String;
    message3: String;
}

const middle1 = (req: CustomNextApiRequest, res: NextApiResponse, next: Function) => {
    // res.json({ message: "middleware" });
    req.message1 = "message from middleware1";
    next();
};
const middle2 = (req, res, next) => {
    // res.json({ message: "middleware" });
    req.message2 = "message from middleware2";
    next();
};
const middle3 = (req, res, next) => {
    // res.json({ message: "middleware" });
    req.message3 = "message from middleware3";
    // req.method === "GET" ? next(Error("oh no")) : next();
    next();
};
function onError(err, req, res, next) {
    console.log(err.message);

    res.status(500).json({ error: err.message });
}
const handler = nc<CustomNextApiRequest, NextApiResponse>({ onError, attachParams: true })
    .use(middle1, middle2, middle3)
    .get(getRequestHandler);
export default connectDB(handler);
