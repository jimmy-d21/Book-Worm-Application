import express from "express";
import authUser from "../middleware/authentication.js";
import { createBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create-book", authUser, createBook);

export default router;