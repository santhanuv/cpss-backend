const db = require("../../db");

const insertUser = async (user) => {
  try {
    const result = await db.query(
      "INSERT INTO users(email, password, role_id, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING user_id, email, role_id, created_on",
      [user.email, user.password, user.roleID, user.firstName, user.lastName]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getUserWithRole = async (id) => {
  try {
    if (!id) throw new Error("Invalid user id");
    const query =
      "SELECT users.user_id, email, created_on, roles.role AS role FROM users JOIN roles ON roles.role_id = users.role_id WHERE users.user_id = $1";
    const params = [id];
    return await db.query(query, params);
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getRoleByName = async (roleName) => {
  try {
    const result = await db.query("SELECT role_id FROM roles WHERE role = $1", [
      roleName,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getRoleByID = async (roleID) => {
  try {
    const result = await db.query("SELECT role FROM roles WHERE role_id = $1", [
      roleID,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userID, client) => {
  try {
    const queryText = "DELETE FROM users WHERE user_id = $1";
    const params = [userID];

    if (client) {
      return await client.query(queryText, params);
    } else {
      return await db.query(queryText, params);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  insertUser,
  getUserByEmail,
  getRoleByName,
  getRoleByID,
  getUserWithRole,
  deleteUser,
};
