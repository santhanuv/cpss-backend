const db = require("../../db");

const insertStudent = async (student, client) => {
  try {
    const queryText =
      "INSERT INTO students(student_id, register_no, adm_no, dob, address, phone, gender, twelth_school, twelth_percentage, tenth_school, tenth_percentage, branch_id, batch_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    const params = [
      student.studentID,
      student.register_no,
      student.adm_no,
      student.dob,
      student.address,
      student.phone,
      student.gender,
      student.twelth_school,
      student.twelth_percentage,
      student.tenth_school,
      student.tenth_percentage,
      student.branchID,
      student.batchID,
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

const updateStudent = async (student, client) => {
  try {
    const queryText =
      "UPDATE students SET register_no = $1, adm_no = $2, dob = $3 , address = $4 , phone = $5, gender = $6, twelth_school = $7, twelth_percentage = $8, tenth_school = $9, tenth_percentage = $10, branch_id = $11, batch_id = $12, status = $13 WHERE student_id = $14;";

    const params = [
      student.register_no,
      student.adm_no,
      student.dob,
      student.address,
      student.phone,
      student.gender,
      student.twelth_school,
      student.twelth_percentage,
      student.tenth_school,
      student.tenth_percentage,
      student.branchID,
      student.batchID,
      student.status,
      student.studentID,
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

const selectStudentWithAcademic = async (studentID) => {
  try {
    if (!studentID) throw new Error("Invalid Student ID");

    const queryText = "SELECT * FROM student_academics WHERE student_id = $1;";
    const params = [studentID];

    return await db.query(queryText, params);
  } catch (err) {
    throw err;
  }
};

module.exports = { insertStudent, selectStudentWithAcademic, updateStudent };
