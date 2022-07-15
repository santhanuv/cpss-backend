require("dotenv").config(); // Not for production
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middilewares/credentials");
const corsOptions = require("./config/cors/corsOptions");

const authRouter = require("./components/auth").router;

const db = require("./db");
require("./db/init");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

app.get("/api/users", async (req, res) => {
  const data = await db.query("SELECT * FROM users;");
  console.log(data);
  res.send(data);
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
