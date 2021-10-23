const { Schema, model } = require("mongoose");

const nameSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        default: "",
    },
    nickName: {
        type: String,
        trim: true,
        default: "",
    },
    fullName: String,
});

const addressSchema = new Schema({
    city: String,
    street: String,
    houseNumber: String,
});

const contactSchema = new Schema({
    tel: [String],
    email: [String],
    address: addressSchema,
});

const userSchema = new Schema(
    {
        _id: String,
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        active: Boolean,
        gender: {
            type: String,
            trim: true,
        },
        name: nameSchema,
        contact: contactSchema,
        post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        bookmark: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        assistant: String,
        message: [String],
        unreadMessage: [String],
        profilePic: {
            type: String,
            trim: true,
        },
        coverPic: {
            type: String,
            trim: true,
        },
        following: [{ type: Schema.Types.String, ref: "User" }],
        follower: [{ type: Schema.Types.String, ref: "User" }],
    },
    { timestamps: true, _id: false }
);

const userModel = model("User", userSchema);

module.exports = userModel;
