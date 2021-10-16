const { Router } = require("express");
const {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    findUserMiddleware,
} = require("../controllers/user.Controller");

const userRoute = Router();

userRoute.get("/all", getAllUser);

userRoute.get("/:id", findUserMiddleware, getSingleUser);

userRoute.post("/", createUser);

userRoute.put("/:id", findUserMiddleware, updateUser);

userRoute.delete("/:id", findUserMiddleware, deleteUser);

module.exports = userRoute;
