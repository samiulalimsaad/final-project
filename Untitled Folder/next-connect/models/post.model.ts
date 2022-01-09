import { model, Model, Schema } from "mongoose";
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

let Post: Model<postInterface, {}>;
try {
    Post = model("Post");
} catch {
    Post = model("Post", postSchema);
}

export default Post;
