import pool from "../config/db.js";

class BookModel {
  static async createBook(title, owner_id, rating, image, caption) {
    const [result] = await pool.query(
      "INSERT INTO books (title, owner_id, rating, book_image, caption) VALUES (?, ?, ?, ?, ?)",
      [title, owner_id, rating, image, caption]
    );

    return { id: result.insertId, title, owner_id, rating, book_image: image, caption };
  }
}

export default BookModel;
