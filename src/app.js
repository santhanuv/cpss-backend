require("dotenv").config(); // Not for production
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

const authRouter = require("./components/auth").router;

const db = require("./db");

app.use(bodyParser.json());

app.get("/api/users", async (req, res) => {
  const data = await db.query("SELECT * FROM users;");
  console.log(data);
  res.send(data);
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
