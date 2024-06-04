const JWT = require("jsonwebtoken");

const SECRET_KEY = "THISISMYSECRETKEY";

function createToken(user) {
  const payload = {
    _id: user._id,
    first_name: user.first_name,
    email: user.email,
  };

  const token = JWT.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, SECRET_KEY);
  return payload;
}

module.exports = {
  createToken,
  validateToken,
};
