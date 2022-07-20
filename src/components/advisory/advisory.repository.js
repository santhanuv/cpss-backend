const db = require("../../db");

const insertAdvisory = async ({ advisorID, batchID, branchID }) => {
  try {
    if (!advisorID || !batchID || !branchID) throw new Error("Invalid advisor");

    const queryText =
      "INSERT INTO advisory(advisor_id, batch_id, branch_id) VALUES($1, $2, $3);";
    const params = [advisorID, batchID, branchID];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

const selectAllAdvisoryStudents = async (advisorID) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");

    const queryText = "SELECT * FROM advisory_students WHERE advisor_id = $1";
    const params = [advisorID];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

const selectAdvisorStatus = async (advisorID) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");

    const queryText = "SELECT status FROM advisory WHERE advisor_id = $1";
    const params = [advisorID];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

const selectAllAdvisors = async () => {
  try {
    const queryText =
      "SELECT advisory.status, advisory.advisor_id, users.first_name, users.last_name, branches.branch, batches.batch FROM advisory JOIN users ON users.user_id = advisory.advisor_id JOIN branches ON branches.branch_id = advisory.branch_id JOIN batches ON batches.batch_id = advisory.batch_id;";

    return await db.query(queryText);
  } catch (err) {
    throw err;
  }
};

const selectAdvisoryStudent = async (advisorID, admNO) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");
    if (!admNO) throw new Error("Invalid admission NO");

    const queryText =
      "SELECT student_id FROM advisory_students WHERE advisor_id = $1 AND adm_no = $2";
    const params = [advisorID, admNO];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  insertAdvisory,
  selectAllAdvisoryStudents,
  selectAdvisoryStudent,
  selectAdvisorStatus,
  selectAllAdvisors,
};
