const {
  updateAdvisorStatusService,
  removeAdvisor,
} = require("./admin.service");
const { getAllAdvisors } = require("../advisory/advisory.service");

const getAllAdvisorsHandler = async (req, res) => {
  try {
    if (!req.user || !req.user.role === "admin") return res.sendStatus(401);

    const advisors = await getAllAdvisors();

    return res.status(200).json(advisors);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateAdvisorStatusHandler = async (req, res) => {
  try {
    if (!req.user || !req.user.role === "admin") return res.sendStatus(401);

    const advisorID = req.params.advisorID;
    const { status } = req.body;

    if (!advisorID || !status) return res.sendStatus(400);

    const advisors = await updateAdvisorStatusService(advisorID, status);

    return res.status(200).json({ msg: "Status updated" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const removeAdvisorHandler = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user || !req.user.role === "admin") return res.sendStatus(401);

    const advisorID = req.params.advisorID;

    if (!advisorID) return res.sendStatus(400);

    await removeAdvisor(advisorID);
    return res.status(204).json({ msg: "Removed advisor" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllAdvisorsHandler,
  updateAdvisorStatusHandler,
  removeAdvisorHandler,
};
