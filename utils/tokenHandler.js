require("dotenv/config");
const jwt = require("jsonwebtoken");

const createToken = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return token;
};

const verifyToken = token => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return verifiedToken;
};

module.exports = { createToken, verifyToken };
