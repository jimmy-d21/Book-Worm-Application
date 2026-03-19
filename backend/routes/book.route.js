import express from "express";
import authUser from "../middleware/authentication.js";
import { createBook, deleteBook, getAllBooks, getAllOwnerBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/all-books", getAllBooks);
router.get("/owner-books", authUser, getAllOwnerBooks);
router.post("/create-book", authUser, createBook);
router.delete("/delete-book/:id", authUser, deleteBook);

export default router;