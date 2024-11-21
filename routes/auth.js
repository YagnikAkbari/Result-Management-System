const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset-first-time", authController.getResetFirstTime);
router.post("/reset-first-time", authController.postResetFirstTime);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);


module.exports = router;
