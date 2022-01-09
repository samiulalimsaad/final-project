import { model, Model, Schema } from "mongoose";
import { commentInterface } from "../interfaces";

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.String, ref: "User" },
        body: String,
    },
    { timestamps: true }
);

let Comment: Model<commentInterface, {}>;

try {
    Comment = model("Comment");
} catch {
    Comment = model("Comment", commentSchema);
}

export default Comment;
