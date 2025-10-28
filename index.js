import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import authRoutes from "./routes/auth.js";
import booksRoute from "./routes/books.js";

const app = express();

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
}

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`) //server starts
    })

});

//Register Middleware
app.use(logRequest);
app.use("/auth", authRoutes);
app.use("/books", booksRoute);

