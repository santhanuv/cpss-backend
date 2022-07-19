const db = require("../../db");

const getBranchByID = async (branchID) => {
  try {
    if (!branchID) throw new Error("Invalid Branch ID");

    const query = "SELECT * FROM branches WHERE branch_id = $1;";
    const params = [branchID];

    return await db.query(query, params);
  } catch (err) {
    throw err;
  }
};

const getAllBranch = async () => {
  try {
    const query = "SELECT branch FROM branches;";

    return await db.query(query);
  } catch (err) {
    throw err;
  }
};

const getBranchByName = async (branchName) => {
  try {
    if (!branchName) throw new Error("Invalid Branch Name");

    const query = "SELECT * FROM branches WHERE branch = $1;";
    const params = [branchName];

    return await db.query(query, params);
  } catch (err) {
    throw err;
  }
};

module.exports = { getBranchByID, getBranchByName, getAllBranch };
