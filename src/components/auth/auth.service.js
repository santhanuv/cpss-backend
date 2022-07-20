const bcrypt = require("bcrypt");
const { pool } = require("../../db");
const { getAdvisorStatus } = require("../advisory/advisory.service");
const {
  findUserWithPassword,
  findUserWithRole,
} = require("../user/user.service");
const jwtUtils = require("../../utils/jwtUtils");
const authRepo = require("./auth.repository");

const deSerializeUser = async (email, password) => {
  try {
    const user = await findUserWithPassword(email);
    if (!user) return null;
    const { password: passwordHash, ...dsUser } = user;
    const validUser = await bcrypt.compare(password, passwordHash);

    if (validUser) return dsUser;
    else return null;
  } catch (err) {
    throw err;
  }
};

const authenticate = async (user) => {
  const client = await pool.connect();

  try {
    let status = null;
    if (user.role === "advisor") {
      const result = await getAdvisorStatus(user.user_id);
      status = result?.status;
      if (status && status === "rejected")
        return { err: "You are rejected by admin." };
    }

    await client.query("BEGIN");
    // const session = (await authRepo.createSession(user.id, client)).rows[0];
    const refreshToken = await jwtUtils.createRefreshToken(user.user_id);
    const accessToken = await jwtUtils.createAccessToken({
      userID: user.user_id,
      role: user.role,
      status,
    });

    if (!refreshToken || !accessToken)
      throw new Error("Unable to create token");

    await client.query("COMMIT");
    return { accessToken, refreshToken, status };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const reIssueAccessToken = async (refreshToken) => {
  try {
    if (!refreshToken) throw new Error("Invalid refresh Token");
    const { valid, decrypt } = jwtUtils.verify(refreshToken);
    if (!valid) return { accessToken: null, role: null, err: "Invalid token" };

    const userID = decrypt.userID;

    const user = await findUserWithRole(userID);
    if (!user) throw new Error("Unable to find User");

    let status = null;
    if (user.role === "advisor") {
      const result = await getAdvisorStatus(user.user_id);
      status = result?.status;
      if (status && status === "rejected")
        return { err: "You are rejected by admin" };
    }

    const accessToken = await jwtUtils.createAccessToken({
      userID: user.user_id,
      role: user.role,
      status,
    });

    return { accessToken, role: user.role, status };
  } catch (err) {
    throw err;
  }
};

// const logout = async (refreshToken, user) => {
//   try {
//     const verified = (refreshToken && jwtUtils.verify(refreshToken)) || null;
//     const userID =
//       (verified?.valid && verified?.decrypt?.sessionID) || user?.sessionID;

//     if (verified && !verified.valid) return false;
//     if (!sessionID) return false;

//     const isDeleted = await authRepo.deleteSessionByID(sessionID);
//     if (isDeleted.rowCount > 0) return true;
//     return false;
//   } catch (err) {
//     throw err;
//   }
// };

module.exports = {
  authenticate,
  deSerializeUser,
  reIssueAccessToken,
  // logout,
};
