const jwtUtils = require("../utils/jwtUtils");

const deserializeUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return next();
    const [head, accessToken] = authHeader.split(" ");

    if (head !== "Bearer" || !accessToken) return next();

    const { valid, decrypt } = jwtUtils.verify(accessToken);
    if (valid) {
      const { userID, role } = decrypt;
      req.userID = decrypt.userID;
      req.user = {
        userID,
        role,
      };
      return next();
    }
    req.user = null;
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = deserializeUser;
