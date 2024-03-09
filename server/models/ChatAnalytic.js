const mongoose = require("mongoose");

const chatAnalyticSchema = new mongoose.Schema({
    timeStamp : Date,
    sentimentScore : Number,
});
module.exports = mongoose.model("ChatAnalytic", chatAnalyticSchema);