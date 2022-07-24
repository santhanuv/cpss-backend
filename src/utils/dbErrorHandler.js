const dbErrorHandler = (err) => {
  try {
    if (err.code === "23505") {
      const { detail, table } = err;
      if (detail) {
        const [_, key, value] = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
        const errorMsg = `${table} with ${key
          .split("_")
          .join(" ")} "${value}" already exists.`;
        err.msg = errorMsg;
        err.field = { key, value };
        err.httpCode = 422;
      }
    } else {
      err.httpCode = 500;
    }
    return err;
  } catch (err) {
    console.log(err);
    err.httpCode = 500;
    return err;
  }
};

module.exports = dbErrorHandler;
