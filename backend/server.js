import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";
import ENV from "./utils/ENV.js";

const app = express();
app.use(cors({origin: ENV.server.clientUrl}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(ENV.server.backendUrl || ENV.server.port, () => {
  console.log(`Server is running on PORT: 8080`);
});
