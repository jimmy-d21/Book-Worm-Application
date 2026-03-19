import BookModel from "../models/book.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createBook = async (req, res) => {
  try {
    const { title, rating, caption, image } = req.body;
    const user = req.user;

    if (!title || !rating || !caption || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const uploadResult = await cloudinary.uploader.upload(image, { folder: "books" });
    const imageUrl = uploadResult.secure_url;

    const book = await BookModel.createBook(title, user.id, rating, imageUrl, caption);

    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    console.error("createBook error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteBook = async (req,res) => {
  try {
    const {id} = req.params;
    const user = req.user;

    const book = await BookModel.findBookById(id);
    if(!book) {
      return res.status(401).json({error: "Book not found"});
    };

    if(book.owner_id.toString() !== user.id.toString()) {
      return res.status(401).json({error: "You can't delete this books"});
    };

    await BookModel.deleteBook(id);
    res.status(201).json({message: "Deleted book successfully"});

  } catch (error) {
    console.error("createBook error:", error);
    res.status(500).json({ error: "Internal server error." }); 
  }
};