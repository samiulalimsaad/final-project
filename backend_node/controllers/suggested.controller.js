const userModel = require("../models/user.model");

exports.getSuggestedUser = async (req, res) => {
    const users = await userModel
        .find()
        .select("_id")
        .select("name profilePic following");
    const suggestedUser = [
        ...new Set(
            users
                .filter((v) => v._id !== req.params.id)
                .map(
                    (su) =>
                        users.map((us) =>
                            us.following.map((u) => u._id !== su._id && su)
                        )[0]
                )[0]
        ),
    ];

    return res.json({
        suggestedUser,
        success: true,
        message: "Suggested Users",
    });
};
