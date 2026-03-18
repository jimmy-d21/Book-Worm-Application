import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(8080, () => {
  console.log(`Server is running on PORT: 8080`);
});
