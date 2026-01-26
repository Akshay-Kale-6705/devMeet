const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   firstName: {
    type: String,
    required: true,
   },
   lastName: {
    type: String,
   },
   emailId: {
    type: String,
    required: true,
   
   },
   password: {
    type: String,
    required: true,
   },
   age: {
    type: Number,
   },
   gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`
    },
   //  validate(value) {
   //    if (!["male", "female", "others"].includes(value)) {
   //       throw new Error("Gender data is not valid");
   //    }
   //  }
   },
   photoUrl: {
      type: String,
      default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
   },
   about: {
      type: String,
      default: "This is default about of the user",
   },
   skills: {
      type: [String],
   },
},
   {
      timestamps: true,  
   }  
 );

 //create userSchema method to getJWT()
userSchema.methods.getJWT = async function () {
   const user = this;

   const token = await jwt.sign({ _id: user._id }, "DEV@Meet$890", {
      expiresIn: "7d",
   });

   return token;
};

//Create userSchema method to comparepassword
userSchema.methods.validatePassword = async function (passwordInputByUser) {
   const user = this;
   const passwordHash = user.password; 

   const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
   );
    return isPasswordValid;   
};

module.exports = mongoose.model("User", userSchema)