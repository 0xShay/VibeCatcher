const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy({
    clientID: "203431130708-27lidge60ealhtq5e06133moddjol6p5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})