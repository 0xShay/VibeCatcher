const PORT = 3000;

const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Root page");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})