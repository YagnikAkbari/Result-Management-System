const express = require("express");
const router = express.Router();
const ecommController = require("../controller/ecomm");

router.get("/pages", ecommController.getEcommPages);
router.get("/web/home", ecommController.getHomePage);
router.get("/mobile/home", ecommController.getMobileHomePage);

module.exports = router;
