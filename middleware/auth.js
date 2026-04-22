const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "123456") {
    return res.status(401).json({
      ok: false,
      message: "No autorizado"
    });
  }

  next();
};

module.exports = auth;