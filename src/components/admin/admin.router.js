const router = require("express").Router();
const deSerializeUser = require("../../middilewares/deserializeUser");
const adminController = require("./admin.controller");

router.get("/advisors", deSerializeUser, adminController.getAllAdvisorsHandler);
router.post(
  "/students/filter",
  deSerializeUser,
  adminController.getFilteredData
);
router.put(
  "/advisors/:advisorID/status",
  deSerializeUser,
  adminController.updateAdvisorStatusHandler
);
router.delete(
  "/advisors/:advisorID",
  deSerializeUser,
  adminController.removeAdvisorHandler
);

module.exports = router;
