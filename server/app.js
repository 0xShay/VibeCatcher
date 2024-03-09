const PORT = 3000;

const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
require("./auth");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

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

app.get("/auth/failure", (req, res) => {
    res.status(200).send("Login authentication failed");
})

app.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/failure"
}))

app.get("/logout", (req, res) => {
    req.logout();
    res.send("Logged in")
})

app.get("/dashboard", isLoggedIn, (req, res) => {
    res.status(200).send("Dashboard");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})