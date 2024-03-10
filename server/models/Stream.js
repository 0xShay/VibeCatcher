const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    streamID: String,
    channelID: String,
    timestamp: Date,
    paid: Boolean,
});
module.exports = mongoose.model("Stream", streamSchema);