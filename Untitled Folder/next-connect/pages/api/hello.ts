import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../db/index";
import User from "../../models/user.model";

interface CustomNextApiRequest extends NextApiRequest {
    message1: String;
    message2: String;
    message3: String;
}

function onError(err, req, res, next) {
    console.log(err.message);

    res.status(500).json({ error: err.message });
}

const handler = nc<CustomNextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    // .use(middle1, middle2, middle3)
    // .get(getRequestHandler);
    .get(async (req, res) => {
        const user = await User.find({});
        console.log(user);
        res.json({ hello: "hello", user });
    });
export default connectDB(handler);
