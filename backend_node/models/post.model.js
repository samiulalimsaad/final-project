const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true,
    },
    postBody: {
        type: String,
        trim: true,
        required: true,
    },
    postImage: {
        type: String,
        trim: true,
        required: true,
    },
    like: {
        type: String,
        trim: true,
        required: true,
    },
    share: {
        type: String,
        trim: true,
        required: true,
    },
    comments: [
        {
            type: String,
            trim: true,
            required: true,
        },
    ],
});

const postModel = model("Post", postSchema);
// console.log(JSON.stringify(postModel, null, 4));

module.exports = postModel;




