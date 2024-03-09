const mongoose = require("mongoose");

const chatAnalyticSchema = new mongoose.Schema({
    streamID : String,
    timestamp : Date,
    sentimentScore : Number
});
module.exports = mongoose.model("ChatAnalytic", chatAnalyticSchema);