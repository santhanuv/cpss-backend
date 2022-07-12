const authController = require("./auth.controller");

const router = require("express").Router();

router.post("/", authController.userRegistrationHandler);

router.post("/login", authController.userLoginHandler);

module.exports = router;
