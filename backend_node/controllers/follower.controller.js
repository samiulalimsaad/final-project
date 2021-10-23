const userModel = require("../models/user.model");

exports.getAllFollowers = async (req, res) => {
    const followers = await userModel
        .findById(req.params.id)
        .select("follower");
    return res.json({
        followers: followers.follower,
        success: true,
        message: "All followers",
    });
};

const isFollower = (res)=>{
    return res.json({
            success: false,
            message: "Only Follower Allow",
        });
}

exports.addFollower = async (req, res) => {
    try {
        if (!req.body.follower) isFollower(res);
        const data = {
            follower: [req.body.follower],
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
            message: "Follower Added Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.removeFollower = async (req, res) => {
    try {
        if(!req.body.follower)  isFollower(res)
        const data = {
            follower: [req.body.follower],
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
            message: "Follower Removed Successfully",
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        return res.json({ message: JSON.stringify(errors), success: true });
    }
};
