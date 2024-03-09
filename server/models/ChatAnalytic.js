const mongoose = require("mongoose");

const chatAnalyticSchema = new mongoose.Schema({
    timestamp : Date,
    sentimentScore : Number,
});
module.exports = mongoose.model("ChatAnalytic", chatAnalyticSchema);