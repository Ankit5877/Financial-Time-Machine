const mongoose = require("mongoose");

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log(`Error in conecting DataBase`)
    }
}

module.exports = ConnectDB;
