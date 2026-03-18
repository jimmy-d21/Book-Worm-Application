import pool from "../config/db.js";
import bcrypt from "bcryptjs";

class UserModel {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async register(username, email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return { id: result.insertId, username, email };
  }

  static async findEmailExist(email) {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    return rows.length > 0;
  }

  static async findUsernameExist(username) {
    const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
    return rows.length > 0;
  }
}

export default UserModel;
