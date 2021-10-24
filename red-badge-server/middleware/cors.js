const CorsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "POST, PUT, GET, DELETE, OPTIONS");
  return next();
};

module.exports = CorsMiddleware;
