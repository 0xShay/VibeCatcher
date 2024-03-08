const PORT = 3000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Root page");
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})