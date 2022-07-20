const router = require("express").Router();
const deSerializeUser = require("../../middilewares/deserializeUser");
const advisorController = require("../../components/advisory/advisory.controller");

router.post("/", deSerializeUser, advisorController.createAdvisoryHandler);
// router.put("/", deSerializeUser, studentController.studentUpdateHandler);
// router.get("/", deSerializeUser, advisorController.getAllAdvisorsHandler);
router.get(
  "/students",
  deSerializeUser,
  advisorController.getAllAdvisoryStudentsHandler
);
router.get(
  "/students/:admNO",
  deSerializeUser,
  advisorController.getStudentDataHandler
);

router.put(
  "/students/:admNO/status",
  deSerializeUser,
  advisorController.updateStudentStatusHandler
);

router.delete(
  "/students/:studentID",
  deSerializeUser,
  advisorController.removeStudentHandler
);

module.exports = router;
