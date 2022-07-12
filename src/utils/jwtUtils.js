const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL;
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL;

const createRefreshToken = async (sessionID) => {
  try {
    if (!sessionID) throw new Error("Invalid session_ID");

    return jwt.sign({ sessionID }, PRIVATE_KEY, {
      expiresIn: REFRESH_TOKEN_TTL,
      algorithm: "RS256",
    });
  } catch (err) {
    throw err;
  }
};

const createAccessToken = async (user) => {
  try {
    if (!user) throw new Error("Invalid user");

    return jwt.sign(user, PRIVATE_KEY, {
      expiresIn: ACCESS_TOKEN_TTL,
      algorithm: "RS256",
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { createRefreshToken, createAccessToken };
