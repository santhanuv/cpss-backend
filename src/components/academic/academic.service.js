const { insertAcademic } = require("./academic.repository");

const createAcademic = async (academic, client) => {
  try {
    if (!academic) throw new Error("Invalid academic");

    const result = await insertAcademic(academic, client);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createAcademic };
