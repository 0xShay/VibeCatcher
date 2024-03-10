PORT = 3000;

const config = require("./config.json");
const PORT = 3000;
const path = require('path');
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
app.use(express.static('public'));
const { getChannels, getRecentLiveStreams, insertUserChannelsIntoDB } = require("./utilities/youtubeTools.js");

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("../client"));

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

app.get("/sentiment-test", async (req, res) => {
    res.status(200).json(await require("./utilities/sentimentAnalysis")());
})

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

app.get("/sentiment", (req, res) => {
    require("./utilities/sentimentAnalysis")();
    res.status(200).send("Sentiment");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})
app.get("/api/get-channels", isLoggedIn, async (req, res) => {
    try {
        const channels = await getChannels(req.user.accessToken);
        return res.status(200).json(channels);
    } catch(err) {
        console.error(err);
        return res.status(400);
    };
})

app.get("/api/get-recent-live-streams", isLoggedIn, async (req, res) => {
    try {
        const channels = await getChannels(req.user.accessToken);
        if (channels.length == 0) return res.status(404);
        const recentLiveStreams = await getRecentLiveStreams(channels[0]["id"]);
        return res.status(200).json(recentLiveStreams);
    } catch(err) {
        console.error(err);
        return res.status(400).json([]);
    };
})

app.get("/api/insert-channels", isLoggedIn, async (req, res) => {
    return (await insertUserChannelsIntoDB(req.user.userID, req.user.accessToken)) ? res.status(200).send(200) : res.status(400).send(400);
})
app.get('/test.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
  });
