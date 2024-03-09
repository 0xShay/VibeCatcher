const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    streamID : String,
    streamerID : String,
    timestamp : Date,
    numChatUsers : Number,
});
module.exports = mongoose.model("Stream", streamSchema);