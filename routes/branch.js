const express = require("express");
const branchController = require("../controller/branch");
const auth = require("../middleware/is-auth");
const router = express.Router();

router.post("/branch", auth, branchController.createBranch);

module.exports = router;
