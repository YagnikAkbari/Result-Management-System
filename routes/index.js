const express = require("express");
const adminRoutes = require("../routes/admin");
const facultyRoutes = require("../routes/faculty");
const studentRoutes = require("../routes/student");
const authRoutes = require("../routes/auth");

const router = express.Router();

router.use(adminRoutes);
router.use(facultyRoutes);
router.use(studentRoutes);
router.use(authRoutes);

module.exports = router;
