const userModel = require("../models/user.model");

exports.getAllUser = async (_req, res) => {
    const data = await userModel.find();
    res.json({ data: "done" });
};

exports.getSingleUser = async (req, res) => {
    const data = await userModel.findById(req.params.id);
    res.json({ data });
};
