import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
        author: { type: String },
        count: { type: Number },
        title: { type: String }
});

export default mongoose.model("Book", bookSchema);