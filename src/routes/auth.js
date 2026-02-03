const express = require('express');
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post('/signup', async (req, res) => {
    try {
        //validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User added sucessfully...")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credenatials");
        }
        const isPasswordValid = await user. validatePassword(password);
        
        if (isPasswordValid) {
            //get jwt token inside an user.js
            const token = await user.getJWT();
            //Add the token to create and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000), 
            });
            res.send("User login sucessful");
        } else {
            throw new Error("Invalid credenatials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful !!");
});

module.exports = authRouter; 