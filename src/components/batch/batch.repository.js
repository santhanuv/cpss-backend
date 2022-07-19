const db = require("../../db");

const getBatchByID = async (batchID) => {
  try {
    if (!batchID) throw new Error("Invalid Batch ID");

    const query = "SELECT * FROM batches WHERE batch_id = $1;";
    const params = [batchID];

    return await db.query(query, params);
  } catch (err) {
    throw err;
  }
};

const getAllBatch = async () => {
  try {
    const query = "SELECT batch FROM batches;";

    return await db.query(query);
  } catch (err) {
    throw err;
  }
};

const getBatchByName = async (batchName) => {
  try {
    if (!batchName) throw new Error("Invalid Batch Name");

    const query = "SELECT * FROM batches WHERE batch = $1;";
    const params = [batchName];

    return await db.query(query, params);
  } catch (err) {
    throw err;
  }
};

module.exports = { getBatchByID, getBatchByName, getAllBatch };
