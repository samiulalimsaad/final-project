const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userId: { type: Schema.Types.String, ref: "User" },
    body: String,
});

const postSchema = new Schema(
    {
        postBody: String,
        postImage: String,
        like: [{ type: Schema.Types.String, ref: "User" }],
        share: [{ type: Schema.Types.String, ref: "User" }],
        comments: [commentSchema],
        user: { type: Schema.Types.String, ref: "User" },
    },
    { timestamps: true }
);

const postModel = model("Post", postSchema);

module.exports = postModel;
