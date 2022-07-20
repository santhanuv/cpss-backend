const {
  insertStudent,
  selectStudentWithAcademic,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} = require("./student.repository");

const createStudent = async (student, client) => {
  try {
    if (!student || !student.studentID) throw new Error("Invalid Student");

    const result = await insertStudent(student, client);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateStudentService = async (student, client) => {
  try {
    if (!student || !student.studentID) throw new Error("Invalid Student");

    const result = await updateStudent(student, client);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateStudentStatusService = async (studentID, { status }) => {
  try {
    if (!studentID || !status) throw new Error("Invalid student ID or Status");

    const result = await updateStudentStatus(studentID, status);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const getStudentWithAcademicData = async (studentID) => {
  try {
    if (!studentID) throw new Error("Invalid student ID");

    const result = await selectStudentWithAcademic(studentID);

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const removeStudent = async (studentID, client) => {
  try {
    if (!studentID) throw new Error("Invalid student ID");

    await deleteStudent(studentID, client);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createStudent,
  getStudentWithAcademicData,
  updateStudentService,
  updateStudentStatusService,
  removeStudent,
};
