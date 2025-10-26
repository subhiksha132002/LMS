import express from "express";
import Book from "../model/bookSchema.js";

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error){
        res.status(500).send(error);
    }
});

router.post('/', async (req,res) => {
    try{

        const book = new Book(req.body.book);
        await book.save();
        res.status(201).json(book);

    } catch(error) {
         res.status(500).send(error);
    }
});

export default router;