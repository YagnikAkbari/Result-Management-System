const express = require("express");
const router = express.Router();
const studentElectiveController = require("../controller/studentElective");

router.post("/student/elective/add", studentElectiveController.addElective);

module.exports = router;
