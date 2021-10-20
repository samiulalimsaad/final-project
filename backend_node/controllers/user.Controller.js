const userModel = require("../models/user.model");

exports.findUserMiddleware = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (user) next();
    else res.json({ message: "user Not Found", success: false });
};

exports.getAllUser = async (_req, res) => {
    const users = await userModel.find();
    res.json({ users, success: true, message: "All Users" });
};


exports.getSingleUser = async (req, res) => {
    console.log({ userId: req.params });
    const user = await userModel.findById(req.params.id).populate("post follower following");
    res.json({ user, success: true, message: "user Found" });
};

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const user = new userModel(data);
        await user.save((error, v) => {
            if (error) {
                console.error({ error });
                return res.json({ message: error.message, success: false });
            }
            return res.json({
                user: v,
                success: true,
                message: "User Created Successfully",
            });
        });
    } catch (error) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        console.error({ errors });
        res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: data,
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
        console.error({ errors });
        res.json({ message: JSON.stringify(errors), success: true });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        return res.json({
            user,
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        console.error({ error });
        res.json({ message: error.message, success: false });
    }
};
