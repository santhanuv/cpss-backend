const { createUser, findRole } = require("../user/user.service");
const {
  serializeUser,
  authenticate,
  deSerializeUser,
  reIssueAccessToken,
  logout,
} = require("./auth.service");
const ms = require("ms");

const userRegistrationHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.role)
      res.sendStatus(401);

    const userRole = await findRole({ roleName: req.body.role });
    if (!userRole) res.sendStatus(401);

    const user = {
      email: req.body.email,
      password: req.body.password,
      role: userRole.id,
    };

    const serialUser = await serializeUser(user);
    const result = await createUser(serialUser);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("No email or password");
    const user = await deSerializeUser(email, password);
    if (!user) return res.sendStatus(400);

    const userRole = await findRole({ roleID: user.role });
    user.role = userRole.name;

    const { accessToken, refreshToken } = await authenticate(user);

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(`${process.env.REFRESH_TOKEN_TTL}`),
      sameSite: "none",
      secure: true,
    });

    res.json({ accessToken, role: user.role });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const { accessToken, role, err } = await reIssueAccessToken(refreshToken);

    if (!accessToken && err) return res.sendStatus(400);
    else if (!accessToken) return res.sendStatus(500);

    return res.json({ accessToken, role });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const userLogoutHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const user = req.user;
    if (!refreshToken && !user?.sessionID) return res.sendStatus(401);
    const status = await logout(refreshToken, user);
    if (!status) return res.sendStatus(401);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  userRegistrationHandler,
  userLoginHandler,
  refreshTokenHandler,
  userLogoutHandler,
};
