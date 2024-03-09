const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");

const User = require("./models/User");

module.exports = (connection) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        User.findOne({
            userID: profile.id
        }).then((err, user) => {
            if (err) return done(err, user);
            if (!user) {
                newUser = new User({
                    userID: profile.id,
                    email: profile.email,
                    displayName: profile.displayName,
                    credits: 0
                });
                newUser.save().catch(console.error);
                return done(null, user);
            } else {
                return done(null, user);                
            }
        }).catch((err) => { return done(err, null); });
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user.userID);
    })
    
    passport.deserializeUser((userID, done) => {
        User.findOne({
            userID: userID
        }).then((err, user) => {
            if (err) return done(err, user);
            if (!user) {
                return done(new Error("User not found"), null);
            } else {
                return done(null, user);
            }
        }).catch((err) => { return done(err, null); });
    })
}