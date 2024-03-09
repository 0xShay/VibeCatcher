const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    messageID : String,
    messageContent : String,
    streamID: String,
    authorID : Number,
    timeStamp : Date,
});
module.exports = mongoose.model("ChatMessage", chatMessageSchema);