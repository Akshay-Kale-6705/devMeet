const express = require('express');

const requestRouter = express.Router()

const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    //sending a connection request
    console.log("Sending connection request !");

    res.send(user.firstName + " sent the connection request !");
});

module.exports = requestRouter;