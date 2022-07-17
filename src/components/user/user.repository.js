const db = require("../../db");

const insertUser = async (user) => {
  try {
    const result = await db.query(
      "INSERT INTO users(email, password, role_id, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING id, email, role, created_on",
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
      "SELECT users.id, email, created_on, roles.name AS role \
    FROM users JOIN roles ON roles.id = users.role WHERE users.id = $1";
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
    const result = await db.query("SELECT id FROM roles WHERE name = $1", [
      roleName,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getRoleByID = async (roleID) => {
  try {
    const result = await db.query("SELECT name FROM roles WHERE id = $1", [
      roleID,
    ]);
    return result;
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
};
