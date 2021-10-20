const userModel = require("../models/user.model");

exports.getAllFollowers = async (req, res) => {
    const followers = await userModel
        .findById(req.params.id)
        .select("follower");
    console.log(followers);
    res.json({
        followers: followers.follower,
        success: true,
        message: "All followers",
    });
};

exports.addFollower = async (req, res) => {
    try {
        const data = {
            follower: [req.body.follower],
        };
        console.log(data);
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
            message: "User Updated Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.removeFollower = async (req, res) => {
    try {
        const data = req.body;
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
            message: "User Updated Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        res.json({ message: JSON.stringify(errors), success: true });
    }
};
