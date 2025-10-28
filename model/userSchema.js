import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {type:String,enum: ["admin","user"],default:"user"},
    token: String,
});

export default mongoose.model("User",userSchema);