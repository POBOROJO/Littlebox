import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"../"
})

const databaseConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    } catch(err){
        console.log(err);
    }
}