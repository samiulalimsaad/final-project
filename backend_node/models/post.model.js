const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    body: String,
});

const postSchema = new Schema(
    {
        postBody: String,
        postImage: String,
        like: Number,
        share: Number,
        comments: [commentSchema],
        user: { type: Schema.Types.String, ref: "User" },
    },
    { timestamps: true }
);

const postModel = model("Post", postSchema);

module.exports = postModel;
