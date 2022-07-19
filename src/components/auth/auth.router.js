const authController = require("./auth.controller");

const router = require("express").Router();

router.post("/login", authController.userLoginHandler);

router.post("/logout", authController.userLogoutHandler);

router.get("/refresh", authController.refreshTokenHandler);

module.exports = router;
