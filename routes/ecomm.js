const express = require("express");
const router = express.Router();
const ecommController = require("../controller/ecomm");

router.get("/pages", ecommController.getEcommPages);

module.exports = router;
