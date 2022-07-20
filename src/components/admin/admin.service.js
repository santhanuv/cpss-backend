const {
  selectAllAdvisors,
  updateAdvisorStatus,
  deleteAdvisor,
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

module.exports = { getAllAdvisors, updateAdvisorStatusService, removeAdvisor };
