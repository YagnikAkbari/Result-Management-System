const express = require("express");
const batchController = require("../controller/batch");
const auth = require("../middleware/is-auth");
const router = express.Router();

// router.post("/results", auth, batchController.createBatch);

module.exports = router;