const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const serializeUser = async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);

    return {
      ...user,
      password: hash,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { serializeUser };
