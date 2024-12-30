const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/is-auth");
const adminController = require("../controller/admin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },  
});

const upload = multer({ storage: storage });

router.get("/admin", auth, adminController.getAdminPage);

router.get("/studentData", auth, adminController.getStudentData);

router.post("/faculty/create", auth, adminController.createFaculty);

router.post(
  "/studentData",
  auth,
  upload.single("excel"),
  adminController.postStudentData
);

router.post("/convert-datea-format", upload.single('timedate'), adminController.convertTimestampToDate)

router.post(
  "/admin",
  auth,
  upload.single("excel"),
  adminController.postResultData
);

module.exports = router;
