const mongoose = require('mongoose');

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
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
         throw new Error("Gender data is not valid");
      }
    }
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

module.exports = mongoose.model("User", userSchema)