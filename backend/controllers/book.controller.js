import * as bookService from "../services/book.service.js";

export const createBook = async (req, res) => {
  try {
    const { title, rating, caption, image } = req.body;

    if (!title || !rating || !caption || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await bookService.createBook(req.user.id, {
      title,
      rating,
      caption,
      image
    });

    return res.status(201).json({
      message: "Book created successfully",
      data: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id, req.user.id);

    res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Server error"
    });
  }
};

export const getOwnerBooks = async (req, res) => {
  try {
    const books = await bookService.getOwnerBooks(req.user.id);

    res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();

    res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};