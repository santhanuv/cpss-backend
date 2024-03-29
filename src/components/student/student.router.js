const router = require("express").Router();
const deSerializeUser = require("../../middilewares/deserializeUser");
const studentController = require("./student.controller");

router.post("/", deSerializeUser, studentController.studentRegistrationHandler);
router.put("/", deSerializeUser, studentController.studentUpdateHandler);
router.get("/all", deSerializeUser, studentController.getAllStudentDataHander);

module.exports = router;
