const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

//middleware
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credenatials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            //create jwt token

            const token = await jwt.sign({ _id: user.id }, "DEV@Meet$890", { 
                expiresIn: "7d", 
            });

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

app.get("/profile", userAuth, async (req, res) => {
    try {
       const user = req.user;

        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    //sending a connection request
    console.log("Sending connection request !");

    res.send(user.firstName + " sent the connection request !");
});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server is sucessfully listening on port 7777....")
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!")
    });

