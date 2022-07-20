const { findAllBranch } = require("./branch.service");

const getAllBranchHandler = async (req, res) => {
  try {
    const branches = await findAllBranch();
    res.status(200).json(branches);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = { getAllBranchHandler };
