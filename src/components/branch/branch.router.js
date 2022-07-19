const router = require("express").Router();
const deSerializeUser = require("../../middilewares/deserializeUser");
const branchController = require("./branch.controller");

router.get("/", deSerializeUser, branchController.getAllBranchHandler);

module.exports = router;
