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
    tel: [Number],
    email: [String],
    address: addressSchema,
});

const userSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
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
        posts: [String],
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
        following: [
            {
                type: String,
                trim: true,
            },
        ],
        follower: [
            {
                type: String,
                trim: true,
            },
        ],
        posts: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { timestamps: true }
);

const userModel = model("testUser", userSchema);
// console.log(JSON.stringify(userSchema, null, 4));

module.exports = userModel;
