import pool from "../config/db.js";

class BookModel {

  static async getAllBooks() {
    const [results] = await pool.query(`SELECT
                                        b.id AS book_id,
                                        b.book_image,
                                        b.title,
                                        b.rating,
                                        b.caption,
                                        b.created_at,
                                        u.id AS user_id,
                                        u.username,
                                        u.profile_image
                                        FROM books AS b
                                        JOIN users AS u ON u.id = b.owner_id
                                        ORDER BY b.created_at DESC`);
                                        
    const books = results.map(row => ({
      book: {
        id: row.book_id,
        image: row.book_image,
        title: row.title,
        caption: row.caption,
        created_at: row.created_at
      },
      user: {
        id: row.user_id,
        username: row.username,
        profile_image: row.profile_image
      }
    }));

    return books;
  };

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

  static async getAllOwnerBooks(ownerId) {
    const [results] = await pool.query("SELECT * FROM books WHERE owner_id = ?", [ownerId]);
    return [...results];
  };

};

export default BookModel;
