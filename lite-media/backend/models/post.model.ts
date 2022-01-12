import { model, Model, models, Schema } from "mongoose";
import { postInterface } from "../interfaces";

const postSchema = new Schema(
    {
        postBody: String,
        postImage: String,
        like: [{ type: Schema.Types.String, ref: "User" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        user: { type: Schema.Types.String, ref: "User" },
    },
    { timestamps: true }
);

const Post: Model<postInterface, {}> = models.Post || model("Post", postSchema);

export default Post;
