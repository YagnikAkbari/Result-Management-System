const express = require("express");
const semesterController = require("../controller/semester");
const auth = require("../middleware/is-auth");
const router = express.Router();

router.post("/semester", auth, semesterController.createSemester);

module.exports = router;
