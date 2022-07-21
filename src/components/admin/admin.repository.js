const db = require("../../db");

const selectAllAdvisors = async () => {
  try {
    const queryText = "SELECT * FROM advisory;";

    return await db.query(queryText);
  } catch (err) {
    throw err;
  }
};

const updateAdvisorStatus = async (advisorID, status) => {
  try {
    const queryText = "UPDATE advisory SET status = $1 WHERE advisor_id = $2";
    const params = [status, advisorID];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

const filterSelectStudentData = async ({
  batch,
  minCGPA,
  currentBacklogs,
  backlogHistory,
  branches = [],
}) => {
  try {
    const branchString = branches.map((branch) => `'${branch}'`).join(", ");
    const queryText =
      "select * from student_academics where status = 'approved' and batch = $1 and cgpa >= $2 and current_backlogs <= $3 and backlog_history <= $4 and branch IN (" +
      branchString +
      ");";
    const params = [batch, minCGPA, currentBacklogs, backlogHistory];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

const deleteAdvisor = async (advisorID, client) => {
  try {
    const queryText = "DELETE FROM advisory WHERE advisor_id = $1";
    const params = [advisorID];

    if (client) {
      return await client.query(queryText, params);
    } else {
      return await db.query(queryText, params);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  selectAllAdvisors,
  updateAdvisorStatus,
  deleteAdvisor,
  filterSelectStudentData,
};
