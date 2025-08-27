const mongoose = require('mongoose');
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb Connected successfully");
    }catch(err){
        console.error("Mongo connection failed.",err);
        process.exit(1);
    }
}
module.exports =connectDB;