const mongoose = require("mongoose");

const creditPurchaseSchema = new mongoose.Schema({
    transactionSignature : String,
    timeStamp : Date,
    streamerID : String,
    lamports : Number,
    lamportsPerCredit : Number,
});
module.exports = mongoose.model("CreditPurchase", creditPurchaseSchema);