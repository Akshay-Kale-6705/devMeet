const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.use(cookieParser());
     
//routes 
const authRouter = require("./routes/auth");
const profile = require("./routes/profile");
const requests = require("./routes/request");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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

