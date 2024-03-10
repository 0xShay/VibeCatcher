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

app.get("/api/is-logged-in", (req, res) => {
    return res.status(200).send(req.user ? true : false);
})

app.get("/api/logout", (req, res) => {
    req.logout(console.error);
    return res.status(200).send("Logged out")
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

app.get("/api/get-user-data", isLoggedIn, async (req, res) => {
    return res.json({
        userID: req.user.userID,
        displayName: req.user.displayName,
        credits: req.user.credits,
        publicKey: req.user.publicKey
    })
})

//getStreamAnalytics Mock get endpoint
const mockStreamAnalyticsData = {
    "timestamp": Date.now(),
    "stream_id": "abc123",
    "analytics": {
      "sentiment": 1000,
      "graph": [0,0.4,1,-0.2,1,0],
      "comments": 200
    }
};

app.get('/stream-analytics', (req, res) => {
    res.status(200).json(mockStreamAnalyticsData); 
});

app.listen(config["port"], () => {
    console.log("App is running on port " + config["port"]);
});