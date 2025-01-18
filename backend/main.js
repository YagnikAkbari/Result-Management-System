const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const { connectDatabaseWithRetry } = require("./database/connection");
4;
const Session = require("./model/session");
const { isTokenExpired, isTokenExist } = require("./config/random");

const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    console.log("tokentokentokenpath-------", bearerToken, req.path);
    if (!bearerToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = bearerToken?.split(" ")[1];
    console.log("tokentokentokenpathsingle-------", token);
    if ((await isTokenExpired(token)) || !(await isTokenExist(token))) {
      await Session.deleteOne({ token });
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("checkfor valid token after again");
    // req.token = token;
    req.authData = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log("Error Condition Middleware", err);
  }
};

const conditionalMiddleware = (req, res, next) => {
  try {
    const bypassRoutes = ["/reset", "/login"];
    if (bypassRoutes.includes(req.path)) {
      return next();
    } else {
      return authMiddleware(req, res, next);
    }
  } catch (err) {
    console.log("Error Condition Middleware", err);
  }
};

app.use(conditionalMiddleware);
app.use(routes);

app.use((err, req, res, next) => {
  console.log("Error Middleware:-", err);
  return res.status(err?.httpStatusCode ?? 500).json({ message: err?.message });
});
connectDatabaseWithRetry();

app.listen(PORT, (req, res, next) => {
  console.log(`Backend is running on ${PORT}`);
});
