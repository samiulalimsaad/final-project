const userModel = require("../models/user.model");

exports.getAllFollowing = async (req, res) => {
    const followings = await userModel
        .findById(req.params.id)
        .select("following");
    return res.json({
        followings: followings.following,
        success: true,
        message: "All followings",
    });
};

const isFollowing = (res) => {
    return res.json({
        success: false,
        message: "Only Following Allow",
    });
};

exports.addFollowing = async (req, res) => {
    try {
        if (!req.body.following) isFollowing(res);
        const data = {
            following: [req.body.following],
        };
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Following Added Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.removeFollowing = async (req, res) => {
    try {
        if (!req.body.following) isFollowing(res);
        const data = {
            following: [req.body.following],
        };
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Following Removed Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};
