const express = require("express");
const Resulr = require("../model/result");
const router = express.Router();
const auth = require("../middleware/is-auth");
const studentController = require("../controller/student");

router.get("/student", auth, studentController.getStudentPage);
router.get("/student_profile", auth, studentController.getProfile);

// router.post("/result4", auth, studentController.postResult4);
// router.post("/result5", auth, studentController.postResult5);
// router.post("/result6", auth, studentController.postResult6);

module.exports = router;
