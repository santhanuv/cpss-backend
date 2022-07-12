const deserializeUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) next();
  } catch (err) {
    console.log(err);
  }
};
