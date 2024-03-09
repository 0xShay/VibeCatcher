const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    userID : String,
    channelID: String
});
module.exports = mongoose.model("Channel", channelSchema);