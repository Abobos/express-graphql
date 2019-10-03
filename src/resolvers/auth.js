import { verifyToken } from "../utils/tokenHandler";

export default req => {
  try {
    if (!req.headers.authorization) throw null;

    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;

    const userDetails = verifyToken(token);
    return userDetails;
  } catch {}
  {
    return null;
  }
};
