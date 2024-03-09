const config = require("./config.json");

const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const { getChannels, getRecentLiveStreams, insertUserChannelsIntoDB } = require("./utilities/youtubeTools.js");

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

require("./auth")(connection);

app.get("/", (req, res) => {
    return res.status(200).send("<a href=\"/auth/google\">Authenticate with Google</a>");
})

app.get("/auth/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/youtube.readonly"
    ]
}))

app.get("/auth/google/failure", (req, res) => {
    return res.status(200).send("Login authentication failed");
})

app.get("/auth/google/callback", passport.authenticate("google"), isLoggedIn, (req, res) => {
    insertUserChannelsIntoDB(req.user.userID, req.user.accessToken);  
    return res.redirect("/dashboard");
})

app.get("/logout", (req, res) => {
    req.logout(console.error);
    return res.send("Logged out")
})

app.get("/dashboard", isLoggedIn, (req, res) => {
    https://www.googleapis.com/youtube/v3/liveStreams
    res.status(200).send("Dashboard");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})