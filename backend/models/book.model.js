import pool from "../config/db.js";

class BookModel {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT 
        b.id AS book_id,
        b.title,
        b.rating,
        b.caption,
        b.book_image,
        b.created_at,
        u.id AS user_id,
        u.username,
        u.profile_image
      FROM books b
      JOIN users u ON u.id = b.owner_id
      ORDER BY b.created_at DESC
    `);

    return rows.map(row => ({
      book: {
        id: row.book_id,
        title: row.title,
        rating: row.rating,
        caption: row.caption,
        image: row.book_image,
        createdAt: row.created_at
      },
      user: {
        id: row.user_id,
        username: row.username,
        profileImage: row.profile_image
      }
    }));
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows[0];
  }

  static async createBook({ title, owner_id, rating, image, caption }) {
    const [result] = await pool.query(
      `INSERT INTO books (title, owner_id, rating, book_image, caption)
       VALUES (?, ?, ?, ?, ?)`,
      [title, owner_id, rating, image, caption]
    );

    return {
      id: result.insertId,
      title,
      owner_id,
      rating,
      image,
      caption
    };
  }

  static async delete(id) {
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
  }

  static async getByOwner(ownerId) {
    const [rows] = await pool.query(
      "SELECT * FROM books WHERE owner_id = ?",
      [ownerId]
    );

    return rows;
  }
}

export default BookModel;