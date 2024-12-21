const express = require("express");
const adminRoutes = require("../routes/admin");
const facultyRoutes = require("../routes/faculty");
const studentRoutes = require("../routes/student");
const authRoutes = require("../routes/auth");
const batchRoutes = require("../routes/batch");
const branchRoutes = require("../routes/branch");
const divisionRoutes = require("../routes/division");
const semesterRoutes = require("../routes/semester");
const subjectRoutes = require("../routes/subject");
const resultRoutes = require("../routes/result");
const electiveGroupRoutes = require("../routes/electiveGroup");
const studentElectiveRoutes = require("../routes/studentElective");

const router = express.Router();

router.use(adminRoutes);
router.use(facultyRoutes);
router.use(studentRoutes);
router.use(authRoutes);
router.use(batchRoutes);
router.use(branchRoutes);
router.use(divisionRoutes);
router.use(semesterRoutes);
router.use(subjectRoutes);
router.use(resultRoutes);
router.use(electiveGroupRoutes);
router.use(studentElectiveRoutes);

module.exports = router;
