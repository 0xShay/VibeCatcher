PORT = 3000;

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

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("../client"));

require("./auth")(connection);

app.get("/", (req, res) => {
    res.status(200).send("<a href=\"/auth/google\">Authenticate with Google</a>");
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
    res.status(200).send("Login authentication failed");
})

app.get("/auth/google/callback", passport.authenticate("google"), isLoggedIn, (req, res) => {
    res.redirect("/dashboard");
})

app.get("/logout", (req, res) => {
    req.logout(console.error);
    res.send("Logged out")
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