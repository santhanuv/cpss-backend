const { createUser, findRole } = require("../user/user.service");
const { serializeUser } = require("../../utils/serializeUser");
const dbErrorHandler = require("../../utils/dbErrorHandler");

const userRegistrationHandler = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.role ||
      !req.body.firstName ||
      !req.body.lastName
    )
      return res.sendStatus(400);

    const userRole = await findRole({ roleName: req.body.role });
    if (!userRole) return res.sendStatus(400);

    if (userRole.role === "admin") return res.sendStatus(401);

    const user = {
      email: req.body.email,
      password: req.body.password,
      roleID: userRole.role_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const serialUser = await serializeUser(user);
    const result = await createUser(serialUser);
    if (result.role_id !== userRole.role_id)
      throw Error("User created with Bad Role");

    return res.json({ msg: "User Created" });
  } catch (err) {
    console.log(err);
    err = dbErrorHandler(err);
    return res.status(err.httpCode || 500).json({
      msg: err.msg,
      field: { key: err.field?.key, value: err.field?.value },
    });
  }
};

module.exports = { userRegistrationHandler };
