const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");

const User = require("./models/User");

module.exports = (connection) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        await User.findOne({
            userID: profile.id
        }).then((user) => {
            if (!user) {
                newUser = new User({
                    userID: profile.id,
                    email: profile.email,
                    displayName: profile.displayName,
                    credits: 0
                });
                newUser.save().catch((err) => { console.error("l24 auth: " + err); return done(err); });
                user = newUser;
            };
            return done(null, user);
        }).catch((err) => { console.error("l44 auth: " + err); return done(err); });
    }))
    
    passport.serializeUser((user, done) => {
        return done(null, user.userID);
    })
    
    passport.deserializeUser((userID, done) => {
        User.findOne({
            userID: userID
        }).then((user) => {
            if (!user) {
                return done(new Error("User not found"));
            } else {
                return done(null, user);
            }
        }).catch((err) => { console.error("l44 auth: " + err); return done(err); });
    })
}