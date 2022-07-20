const {
  insertAdvisory,
  selectAllAdvisoryStudents,
  selectAdvisoryStudent,
  selectAdvisorStatus,
  selectAllAdvisors,
} = require("./advisory.repository");

const createAdvisory = async ({ advisorID, batchID, branchID }) => {
  try {
    if (!advisorID || !batchID || !branchID) throw new Error("Invalid advisor");

    await insertAdvisory({ advisorID, batchID, branchID });
    return true;
  } catch (err) {
    throw err;
  }
};

const getAllAdvisoryStudents = async (advisorID) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");

    const result = await selectAllAdvisoryStudents(advisorID);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const getAdvisoryStudentID = async (advisorID, admNO) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");
    if (!admNO) throw new Error("Invalid admission NO");

    const result = await selectAdvisoryStudent(advisorID, admNO);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAdvisorStatus = async (advisorID, admNO) => {
  try {
    if (!advisorID) throw new Error("Invalid advisor ID");

    const result = await selectAdvisorStatus(advisorID);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAllAdvisors = async () => {
  try {
    const result = await selectAllAdvisors();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// const removeUser = async (userID) => {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");
//     await deleteAdvisor(advisorID, client);
//     await deleteUser(advisorID, client);
//     await client.query("COMMIT");
//     return true;
//   } catch (err) {
//     await client.query("ROLLBACK");
//     throw err;
//   } finally {
//     client.release();
//   }
// };

module.exports = {
  createAdvisory,
  getAllAdvisoryStudents,
  getAdvisoryStudentID,
  getAdvisorStatus,
  getAllAdvisors,
};
