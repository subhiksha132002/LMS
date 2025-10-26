import express from "express";
import Book from "../model/bookSchema.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const bookExist = await Book.findOne({ _id: id });
        if (!bookExist) {
            return res.status(404).json({ message: "Book Not Found" });
        }
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    try {

        const book = new Book(req.body.book);
        await book.save();
        res.status(201).json(book);

    } catch (error) {
        res.status(500).send(error);
    }
});



router.put('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const bookExist = await Book.findOne({ _id: id });
        if (!bookExist) {
            return res.status(404).json({ message: "Book Not Found" });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, req.body.book, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bookExist = await Book.findOne({ _id: id });
        if (!bookExist) {
            return res.status(404).json({ message: "Book Not Found" });
        }

        await Book.findByIdAndDelete(id);
        res.status(204).json({ message: "Book deleted successfully" });

    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;