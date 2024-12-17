const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const routes = require("./routes/index");
const { connectDatabaseWithRetry } = require("./database/connection");
const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controller/error");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    store: store,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.successMessage = null;
  res.locals.errorMessage = null;
  next();
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res, next) => {
  res.redirect("/login");
});

app.use(routes);
app.get("*", errorController.get404);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err?.httpStatusCode ?? 500).json(err?.message);
});
connectDatabaseWithRetry();

app.listen(PORT, (req, res, next) => {
  console.log(`Backend is running on ${PORT}`);
});
