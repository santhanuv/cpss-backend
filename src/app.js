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
const userRouter = require("./components/user").router;
const studentRouter = require("./components/student").router;
const batchRouter = require("./components/batch").router;
const branchRouter = require("./components/branch").router;

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
app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/batch", batchRouter);
app.use("/branch", branchRouter);

// const branch = require("./components/branch/branch.service");
// (async () => {
//   const result = await branch.findBranch({ branchName: "FT" });
//   console.log(result);
// })();

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
