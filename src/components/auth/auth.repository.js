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

const findSessionByID = async (sessionID) => {
  try {
    if (!sessionID) throw new Error("Invalid sessionID");

    const query = "SELECT * FROM sessions WHERE id = $1";
    const queryValues = [sessionID];

    return await db.query(query, queryValues);
  } catch (err) {
    throw err;
  }
};

const deleteSessionByID = async (sessionID) => {
  try {
    if (!sessionID) throw new Error("Invalid sessionID");
    const query = "DELETE FROM sessions WHERE id = $1";
    const queryValues = [sessionID];

    return await db.query(query, queryValues);
  } catch (err) {
    throw err;
  }
};

module.exports = { createSession, findSessionByID, deleteSessionByID };
