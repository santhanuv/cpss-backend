const {
  insertStudent,
  selectStudentWithAcademic,
  updateStudent,
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

const getStudentWithAcademicData = async (studentID) => {
  try {
    if (!studentID) throw new Error("Invalid student ID");

    const result = await selectStudentWithAcademic(studentID);

    return result.rows[0];
  } catch (err) {}
};

module.exports = {
  createStudent,
  getStudentWithAcademicData,
  updateStudentService,
};
