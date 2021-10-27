const userModel = require("../models/user.model");

exports.getSuggestedUser = async (req, res) => {
    const users = await userModel
        .find()
        .select("_id")
        .select("name profilePic following");
    const suggestedUser = users.filter((v) => v._id !== req.params.id);
    return res.json({
        suggestedUser,
        success: true,
        message: "Suggested Users",
    });
};
