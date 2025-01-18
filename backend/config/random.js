const jwt = require("jsonwebtoken");
const Session = require("../model/session");
const getJWT = (data) => {
  return jwt.sign(
    { _id: data._id.toString(), email: data.username },
    process.env.JWT_SECRET || "VERYDANGIOUTEEHRDMVC<SFC>DCFSDFCK</SFC>",
    { expiresIn: "10m" }
  );
};
const isTokenExpired = async (token) => {
  try {
    console.log("checkfor valid token ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log(
    //   "checkfor valid token---- ",
    //   decoded?.exp,
    //   currentTimestamp,
    //   currentTimestamp - decoded?.iat,
    //   decoded?.exp < currentTimestamp
    // );

    if (decoded?.exp < currentTimestamp) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};
const isTokenExist = async (token) => {
  try {
    const data = await Session.findOne({ token });
    console.log("datadata:'''''''", data, token);
    
    if (!data) {
      return false;
    }
    return true;
  } catch (err) {}
};

module.exports = {
  getJWT,
  isTokenExpired,
  isTokenExist,
};
