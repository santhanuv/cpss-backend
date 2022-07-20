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

module.exports = { selectAllAdvisors, updateAdvisorStatus, deleteAdvisor };
