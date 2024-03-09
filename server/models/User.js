const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID : String,
    email: String,
    displayName: String,
    credits : Number,
    accessToken: String,
    refreshToken: String,
    publicKey: Buffer,
    secretKey: Buffer
});
module.exports = mongoose.model("User", userSchema);