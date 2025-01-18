const express = require("express");
const router = express.Router();
const electiveGroupController = require("../controller/electiveGroup");

router.post("/elective/group/add", electiveGroupController.createElectiveGroup);

module.exports = router;
