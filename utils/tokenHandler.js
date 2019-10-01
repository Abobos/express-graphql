require("dotenv/config");
const jwt = require("jsonwebtoken");

const createToken = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return token;
};

const verifyToken = token => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return decoded;
};

module.exports = { createToken, verifyToken };
