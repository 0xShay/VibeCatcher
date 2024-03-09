const PORT = 3000;

const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

const axios = require("axios");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

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
    // https://www.googleapis.com/youtube/v3/liveStreams
    // axios.get(
    //     "https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet&mine=true",
    //     { headers: {"Authorization" : `Bearer ${req.user.accessToken}`} }
    // ).then(res => {
    //     console.log(res);
    // });
    // console.log(req.user);
    res.status(200).send("Dashboard");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})