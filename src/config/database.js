const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://akshaykale:GA8RKChhf44WOWuM@namstenode.c1ebl2c.mongodb.net/devMeet"
    )
};

module.exports = connectDB;

 
   
    
 