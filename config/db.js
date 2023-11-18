import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const URL=process.env.MONGO_URL;

const connectDB = async ()=>{
    try {
        const conn=await mongoose.connect(URL);
        console.log(`Connected to Mongodb database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;