import express from "express";
import authUser from "../middleware/authentication.js";
import { createBook, deleteBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create-book", authUser, createBook);
router.delete("/delete-book/:id", authUser, deleteBook);

export default router;