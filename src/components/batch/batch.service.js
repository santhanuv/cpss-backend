const {
  getBatchByID,
  getBatchByName,
  getAllBatch,
} = require("./batch.repository");

const findBatch = async ({ batchID, batchName }) => {
  try {
    let result = null;

    if (!batchID && !batchName) throw new Error("Invalid batch");

    if (batchID) {
      result = await getBatchByID(batchID);
    } else if (batchName) {
      result = await getBatchByName(batchName);
    } else {
      throw new Error("Invalid Batch ID and Batch");
    }

    if (result) {
      return result.rows[0];
    } else {
      console.error("No result from db query");
      return result;
    }
  } catch (err) {
    throw err;
  }
};

const findAllBatch = async () => {
  try {
    const result = await getAllBatch();
    const batches = result.rows.map((row) => row.batch);
    return batches;
  } catch (err) {
    throw err;
  }
};

module.exports = { findBatch, findAllBatch };
