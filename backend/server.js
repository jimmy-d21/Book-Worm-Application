// backend/server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";
import ENV from "./utils/ENV.js";

const app = express();

app.use(cors({ origin: ENV.server.clientUrl }));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = ENV.server.port;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});