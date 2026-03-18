import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(8080, () => {
  console.log(`Server is running on PORT: 8080`);
});
