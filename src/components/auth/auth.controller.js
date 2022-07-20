const {
  createUser,
  findRole,
  findUserWithRole,
} = require("../user/user.service");
const {
  serializeUser,
  authenticate,
  deSerializeUser,
  reIssueAccessToken,
  logout,
} = require("./auth.service");
const ms = require("ms");

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("No email or password");
    const user = await deSerializeUser(email, password);
    if (!user) return res.sendStatus(401);

    const userRole = await findRole({ roleID: user.role_id });
    user.role = userRole.role;

    const { accessToken, refreshToken, status, err } = await authenticate(user);

    if (err) {
      return res.status(401).json({ msg: err });
    }

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(`${process.env.REFRESH_TOKEN_TTL}`),
      sameSite: "none",
      secure: true,
    });

    res.json({ accessToken, role: user.role, status: status });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const { accessToken, role, err, status } = await reIssueAccessToken(
      refreshToken
    );

    if (!accessToken && err) return res.sendStatus(401);
    else if (!accessToken) return res.sendStatus(500);

    return res.json({ accessToken, role, status });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const userLogoutHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const user = req.user;
    if (!refreshToken && !user) return res.sendStatus(401);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  userLoginHandler,
  refreshTokenHandler,
  userLogoutHandler,
};
