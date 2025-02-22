import mongoose from "mongoose";
import {MONGO_DB_URI} from './dotenv';

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_DB_URI!);
        console.log("db connected");
    }
    catch(error){
        console.log(error)
        console.error("db connection error");
        // process.exit(1);
    }
};
