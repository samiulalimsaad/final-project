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
                        users.filter((us) =>
                            us.following.map((u) => u._id !== su._id)
                        )[0]
                )[0]
        ),
    ];

    return res.json({
        suggestedUser,
        suggestedUserLength: suggestedUser.length,
        success: true,
        message: "Suggested Users",
    });
};
