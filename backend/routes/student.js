const express = require("express");
const Resulr = require("../model/result");
const router = express.Router();
const auth = require("../middleware/is-auth");
const studentController = require("../controller/student");

router.get("/profile", studentController.getProfile);

router.get("/student", auth, studentController.getStudentPage);
router.get("/result", auth, studentController.getResult);

module.exports = router;
