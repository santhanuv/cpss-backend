const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL;
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL;

const createRefreshToken = async (userID) => {
  try {
    if (!userID) throw new Error("Invalid user ID");

    return jwt.sign({ userID }, PRIVATE_KEY, {
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

const verify = (token) => {
  try {
    const decrypt = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    return { valid: true, expired: false, decrypt };
  } catch (err) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decrypt: null,
    };
  }
};

module.exports = { createRefreshToken, createAccessToken, verify };
