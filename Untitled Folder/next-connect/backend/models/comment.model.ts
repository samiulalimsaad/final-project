import { model, Model, models, Schema } from "mongoose";
import { commentInterface } from "../interfaces";

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.String, ref: "User" },
        body: String,
    },
    { timestamps: true }
);

const Comment: Model<commentInterface, {}> =
    models.Comment || model("Comment", commentSchema);

export default Comment;
