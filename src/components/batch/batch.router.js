const router = require("express").Router();
const deSerializeUser = require("../../middilewares/deserializeUser");
const batchController = require("./batch.controller");

router.get("/", deSerializeUser, batchController.getAllBatchHandler);

module.exports = router;
