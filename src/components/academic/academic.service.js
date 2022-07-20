const { insertAcademic, updateAcademic } = require("./academic.repository");

const createAcademic = async (academic, client) => {
  try {
    if (!academic) throw new Error("Invalid academic");

    const result = await insertAcademic(academic, client);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateAcademicService = async (academic, client) => {
  try {
    if (!academic || !academic.studentID)
      throw new Error("Invalid academic or student ID");

    const result = await updateAcademic(academic, client);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createAcademic, updateAcademicService };
