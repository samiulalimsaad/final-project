const userModel = require("../models/user.model");

exports.getAllFollowing = async (req, res) => {
    const followings = await userModel
        .findOne({ userId: req.params.id }, { _id: 0 })
        .select("following");
    console.log(followings);
    res.json({
        followings: followings.following,
        success: true,
        message: "All followings",
    });
};

exports.addFollowing = async (req, res) => {
    try {
        const data = req.body;
        const user = await userModel.findOneAndUpdate(
            { userId: req.params.id },
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
            message: "User Updated Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.removeFollowing = async (req, res) => {
    try {
        const data = req.body;
        const user = await userModel.findOneAndUpdate(
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
            message: "User Updated Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        res.json({ message: JSON.stringify(errors), success: true });
    }
};
