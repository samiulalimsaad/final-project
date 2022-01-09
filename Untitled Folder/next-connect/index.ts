import path from "path";
require("dotenv").config({ path: path.resolve(".env.local") });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import postRoute from "./routes/post.route";
import userRoute from "./routes/user.route";
import followerRoute from "./routes/follower.route";
import followingRoute from "./routes/following.route";
import bookmarkRoute from "./routes/bookmark.route";
import suggestedUserRoute from "./routes/suggested.route";
import activeUserRoute from "./routes/activeUser.route";
import storyRoute from "./routes/story.route";
import infoRoute from "./routes/info.route";

const app = express();

app.use(morgan("tiny"), express.json(), cors({ origin: true }));
app.options("*", cors());

app.get("/", (_, res) => {
    res.send(
        `<h1 style="display: grid;place-items: center; justify-items: center; height: 100vh;width: 100vw;">Home Page</h1>`
    );
});

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/follower", followerRoute);
app.use("/following", followingRoute);
app.use("/bookmark", bookmarkRoute);
app.use("/suggested-user", suggestedUserRoute);
app.use("/active-user", activeUserRoute);
app.use("/story", storyRoute);
app.use("/info", infoRoute);

app.get("/test", (req, res) => {
    res.json({ query: req.query });
});

app.get("*", (_, res) => {
    res.send(
        `<h1 style="display: grid;place-items: center; justify-items: center; height: 100vh;width: 100vw;">Route Not Found
        ${process.env.MONGODB_URL}
        </h1>`
    );
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(process.env.MONGODB_URL);
            console.log(`mongodb connected`);
        })
        .catch((e) => {
            console.error(e);
        });
});
