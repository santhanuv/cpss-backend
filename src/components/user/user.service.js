const userRepo = require("./user.repository");
const { getUserByEmail, getUserWithRole } = require("../user/user.repository");

const createUser = async (user) => {
  try {
    if (!user) throw new Error("Invalid user");

    const result = await userRepo.insertUser(user);
    return result;
  } catch (err) {
    throw err;
  }
};

const findUserWithPassword = async (email) => {
  try {
    const result = await getUserByEmail(email);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const findUserWithRole = async (id) => {
  try {
    const user = await getUserWithRole(id);
    return user.rows[0];
  } catch (err) {
    throw err;
  }
};

const findUser = async (email, id) => {
  try {
    if (email) {
      const result = await getUserByEmail(email);
      const { id, created_on, role } = result.rows[0];
      return {
        id,
        email,
        created_on,
        role,
      };
    } else {
      console.log("this is incomplete function");
    }
  } catch (err) {
    throw err;
  }
};

const findRole = async ({ roleName, roleID }) => {
  try {
    if (roleID) {
      const result = await userRepo.getRoleByID(roleID);
      return { ...result.rows[0], id: roleID };
    } else {
      const result = await userRepo.getRoleByName(roleName);
      return { ...result.rows[0], name: roleName };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  findUser,
  findUserWithPassword,
  findRole,
  findUserWithRole,
};
