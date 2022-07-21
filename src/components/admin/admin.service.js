const {
  selectAllAdvisors,
  updateAdvisorStatus,
  deleteAdvisor,
  filterSelectStudentData,
} = require("./admin.repository");
const { pool } = require("../../db");
const { deleteUser } = require("../user/user.repository");

const getAllAdvisors = async () => {
  try {
    const result = await selectAllAdvisors();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const updateAdvisorStatusService = async (advisorID, status) => {
  try {
    const result = await updateAdvisorStatus(advisorID, status);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const removeAdvisor = async (advisorID) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await deleteAdvisor(advisorID, client);
    await deleteUser(advisorID, client);
    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const filterStudentData = async ({
  batch,
  minCGPA = 0,
  currentBacklogs,
  backlogHistory,
  branches = [],
}) => {
  try {
    currentBacklogs =
      !currentBacklogs || currentBacklogs === "" ? 100 : currentBacklogs;
    backlogHistory =
      !backlogHistory || backlogHistory === "" ? 100 : backlogHistory;

    const result = await filterSelectStudentData({
      batch,
      minCGPA,
      currentBacklogs,
      backlogHistory,
      branches,
    });

    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllAdvisors,
  updateAdvisorStatusService,
  removeAdvisor,
  filterStudentData,
};
