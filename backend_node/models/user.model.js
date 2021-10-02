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
    name: String,
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
        userName: {
            type: String,
            trim: true,
            required: true,
        },
        active : Boolean,
        email: {
            type: String,
            trim: true,
            required: true,
        },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        name: nameSchema,
        contact: contactSchema,
        post: String,
        profilePic: {
            type: String,
            trim: true,
            required: true,
        },
        coverPic: {
            type: String,
            trim: true,
            required: true,
        },
        following: [
            {
                type: String,
                trim: true,
                required: true,
            },
        ],
        follower: [
            {
                type: String,
                trim: true,
                required: true,
            },
        ],
        posts: [
            {
                type: String,
                trim: true,
                required: true,
            },
        ],
    },
    { timestamps: true }
);

const userModel = model("User", userSchema);
// console.log(JSON.stringify(userSchema, null, 4));

module.exports = userModel;
