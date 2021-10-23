const userModel = require("../models/user.model");

exports.getActiveUser = async (req, res) => {
    const users = await userModel.find().select("_id active");
    const suggestedUser = users.filter(
        (v) => v._id !== req.params.id && v.active
    );
    return res.json({
        suggestedUser,
        success: true,
        message: "Suggested Users",
    });
};

exports.setActive = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    active: true,
                },
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Follower Added Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.setDeactive = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    active: false,
                },
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Follower Added Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};
