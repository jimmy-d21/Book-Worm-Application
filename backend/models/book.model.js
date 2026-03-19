import pool from "../config/db.js";

class BookModel {

  static async findBookById(id) {
    const [results] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return results[0];
  };

  static async createBook(title, owner_id, rating, image, caption) {
    const [result] = await pool.query(
      "INSERT INTO books (title, owner_id, rating, book_image, caption) VALUES (?, ?, ?, ?, ?)",
      [title, owner_id, rating, image, caption]
    );

    return { id: result.insertId, title, owner_id, rating, book_image: image, caption };
  };

  static async deleteBook(id) {
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
  };

};

export default BookModel;
