const express = require("express");
const divisionController = require("../controller/division");
const auth = require("../middleware/is-auth");
const router = express.Router();

router.post("/division", auth, divisionController.createDivison);

module.exports = router;
