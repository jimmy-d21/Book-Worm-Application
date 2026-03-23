// backend/server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";

const app = express();

// ✅ IMPORTANT for mobile
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});