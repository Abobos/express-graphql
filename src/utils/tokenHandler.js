import "dotenv/config";
import jwt from "jsonwebtoken";

export const createToken = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return token;
};

export const verifyToken = token => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
