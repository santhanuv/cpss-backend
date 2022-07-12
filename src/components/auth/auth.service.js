const bcrypt = require("bcrypt");
const { pool } = require("../../db");
const {
  createUser,
  findUser,
  findRole,
  findUserWithPassword,
} = require("../user/user.service");
const jwtUtils = require("../../utils/jwtUtils");
const authRepo = require("./auth.repository");
const SALT_ROUNDS = 10;

const serializeUser = async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);

    return {
      email: user.email,
      password: hash,
      role: user.role,
    };
  } catch (err) {
    throw err;
  }
};

const deSerializeUser = async (email, password) => {
  try {
    const user = await findUserWithPassword(email);
    const { password: passwordHash } = user;
    const validUser = await bcrypt.compare(password, passwordHash);

    if (validUser)
      return {
        id: user.id,
        email: user.email,
        created_on: user.created_on,
        role: user.role,
      };
    else return null;
  } catch (err) {
    throw err;
  }
};

const authenticate = async (user) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const session = (await authRepo.createSession(user.id, client)).rows[0];
    const refreshToken = await jwtUtils.createRefreshToken(session.id);
    const accessToken = await jwtUtils.createAccessToken({
      userID: user.id,
      role: user.role,
      sessionID: session.id,
    });

    if (!refreshToken || !accessToken)
      throw new Error("Unable to create token");

    await client.query("COMMIT");
    return { accessToken, refreshToken };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { serializeUser, authenticate, deSerializeUser };
