const express = require("express");
const subjectController = require("../controller/subject");
const auth = require("../middleware/is-auth");
const router = express.Router();

router.post("/subject", auth, subjectController.createSubject);

module.exports = router;