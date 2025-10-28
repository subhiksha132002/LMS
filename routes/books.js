import express from "express";
import Book from "../model/bookSchema.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const books = await Book.find();    
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error);    
    }
});

router.get('/:id', authenticate, async (req, res) => { 
    try {

        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).send("Book not found");

        res.status(200).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', authenticate, authorize,async (req, res) => {
    try {

        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);

    } catch (error) {
        res.status(500).send(error);
    }
});



router.put('/:id',authenticate, authorize, async (req, res) => {
    try {

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedBook) return res.status(404).send("Book not found");

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', authenticate, authorize, async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook) return res.status(404).send("Book not found");

        res.status(204).send(deletedBook);

    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;