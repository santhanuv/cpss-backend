const db = require("../../db");

const insertAcademic = async (
  {
    studentID,
    sgpaS1 = 0.0,
    sgpaS2 = 0.0,
    sgpaS3 = 0.0,
    sgpaS4 = 0.0,
    sgpaS5 = 0.0,
    sgpaS6 = 0.0,
    sgpaS7 = 0.0,
    sgpaS8 = 0.0,
    cgpa = 0.0,
    currentBacklogs = 0,
    backlogHistory = 0,
    skills = null,
  },
  client
) => {
  try {
    if (!studentID) throw new Error("Inavlid Acadmic");

    const queryText =
      "INSERT INTO academics (student_id, sgpa_s1, sgpa_s2, sgpa_s3, sgpa_s4, sgpa_s5, sgpa_s6, sgpa_s7, sgpa_s8, cgpa, current_backlogs, backlog_history, skills) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);";

    const params = [
      studentID,
      sgpaS1,
      sgpaS2,
      sgpaS3,
      sgpaS4,
      sgpaS5,
      sgpaS6,
      sgpaS7,
      sgpaS8,
      cgpa,
      currentBacklogs,
      backlogHistory,
      skills,
    ];

    let result;

    if (client) {
      result = await client.query(queryText, params);
    } else {
      result = await db.query(queryText, params);
    }

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { insertAcademic };
