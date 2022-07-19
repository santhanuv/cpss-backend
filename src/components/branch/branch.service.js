const {
  getBranchByID,
  getBranchByName,
  getAllBranch,
} = require("./branch.repository");

const findBranch = async ({ branchID, branchName }) => {
  try {
    let result = null;

    if (!branchID && !branchName) throw new Error("Invalid Branch");

    if (branchID) {
      result = await getBranchByID(branchID);
    } else if (branchName) {
      result = await getBranchByName(branchName);
    } else {
      throw new Error("Invalid Branch ID and Branch");
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

const findAllBranch = async () => {
  try {
    const result = await getAllBranch();
    const branches = result.rows.map((row) => row.branch);
    return branches;
  } catch (err) {
    throw err;
  }
};

module.exports = { findBranch, findAllBranch };
