import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../db/index";
import postRequestHandler from "../../requestHandler/postReq";

const handler = nc<NextApiRequest, NextApiResponse>().post(postRequestHandler);

export default connectDB(handler);
