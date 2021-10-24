const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

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
        sendError(res, error);
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
        sendError(res, error);
    }
};
