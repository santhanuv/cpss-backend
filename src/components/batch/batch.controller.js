const { findAllBatch } = require("./batch.service");

const getAllBatchHandler = async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401);
    const batches = await findAllBatch();
    res.status(200).json(batches);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = { getAllBatchHandler };
