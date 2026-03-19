import BookModel from "../models/book.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createBook = async (userId, data) => {
  const upload = await cloudinary.uploader.upload(data.image, {
    folder: "books"
  });

  return await BookModel.createBook({
    title: data.title,
    owner_id: userId,
    rating: data.rating,
    image: upload.secure_url,
    caption: data.caption
  });
};

export const deleteBook = async (bookId, userId) => {
  const book = await BookModel.findById(bookId);

  if (!book) {
    throw { status: 404, error: "Book not found" };
  }

  if (book.owner_id !== userId) {
    throw { status: 403, error: "Unauthorized action" };
  }

  await BookModel.delete(bookId);
};

export const getOwnerBooks = async (userId) => {
  return await BookModel.getByOwner(userId);
};

export const getAllBooks = async () => {
  return await BookModel.getAll();
};