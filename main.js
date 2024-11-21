const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "HELLO FROM BACKEND." });
});

app.use(routes);

app.listen(PORT, (req, res, next) => {
  console.log(`Backend is running on ${PORT}`);
});
