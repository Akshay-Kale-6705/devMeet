const express = require("express");

const app = express();

app.use("/dashboard", (req, res) => {
    res.send("Namste from the dashboard!");
});

app.use("/test", (req, res) => {
    res.send("Hello form the server!");
});

app.listen(7777, ()=> {
    console.log("Server is sucessfully listening on port 7777....")
});