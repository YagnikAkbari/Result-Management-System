const express = require("express");
const auth = require("../middleware/is-auth");
const router = express.Router();

const facultyController = require("../controller/faculty");

router.get("/faculty", auth, facultyController.getFacultyPage);

router.post("/result", auth, facultyController.postFacultyResult);

router.get("/grade_history", auth, facultyController.getGradeHistory);

router.post("/grade_history", auth, facultyController.postGradeHistory);

module.exports = router;
