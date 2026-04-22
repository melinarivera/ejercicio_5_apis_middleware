const logger = (req, res, next) => {
const auth = require("./middleware/auth");

console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = logger;
