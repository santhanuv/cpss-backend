const userController = require("./user.controller");

const router = require("express").Router();

router.post("/", userController.userRegistrationHandler);

module.exports = router;
