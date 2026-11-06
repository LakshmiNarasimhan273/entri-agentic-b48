const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        // 2 line connection
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = dbConnection;