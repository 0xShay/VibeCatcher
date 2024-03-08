const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
    // let err = null;
    // console.log(profile);
    // return done(err, {
    //     id: profile.id,
    //     name: profile.name
    // });
}))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})