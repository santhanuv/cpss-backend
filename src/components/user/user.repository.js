const db = require("../../db");

const insertUser = async (user) => {
  try {
    const result = await db.query(
      "INSERT INTO users(email, password, role) VALUES($1, $2, $3) RETURNING id, email, role, created_on",
      [user.email, user.password, user.role]
    );
    return result;
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

module.exports = { insertUser, getUserByEmail, getRoleByName, getRoleByID };
