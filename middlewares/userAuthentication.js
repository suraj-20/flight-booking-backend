const jwt = require("jsonwebtoken");
const { validateToken } = require("../services/authentication");

function fetchUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Authorization header mising" });
  } else {
    try {
      const decodedToken = validateToken(token);
      req.userId = decodedToken._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}

module.exports = fetchUser;
