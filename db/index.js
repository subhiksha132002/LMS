import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGOURL = process.env.MONGO_URL;

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGOURL).then(() => { //DB gets connected here
            console.log("Database connected successfully.");
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1); //stop the app if db fails
    }
};