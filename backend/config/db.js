import mysql from "mysql2/promise"
import ENV from "../utils/ENV.js"

const pool = mysql.createPool({
    host: ENV.database.host,
    user: ENV.database.user,
    password: ENV.database.password,
    database: ENV.database.name
});

// Test connection once at startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
})();

export default pool;