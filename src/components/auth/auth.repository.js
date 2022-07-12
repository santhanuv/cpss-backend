const db = require("../../db");

const createSession = async (userID, client) => {
  try {
    if (!userID) throw new Error("Invalid userID");

    const queryText = "INSERT INTO sessions(user_id) VALUES($1) RETURNING *;";
    const queryValues = [userID];

    if (client) {
      return await client.query(queryText, queryValues);
    } else {
      return await db.query(queryText, queryValues);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { createSession };
