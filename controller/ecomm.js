const webHomePage = require("../jsons/web/home");
const mobileHomePage = require("../jsons/mobile/home");
exports.getEcommPages = async (req, res) => {
  console.log("Ecommm Web V2::::------");

  return res.status(200).json({
    pages: [
      { path: "/web", json: webHomePage },
      { path: "/mobile", json: mobileHomePage },
      // { path: "/web/store-locator" },
      // { path: "/mobile/store-locator" },
    ],
  });
};
