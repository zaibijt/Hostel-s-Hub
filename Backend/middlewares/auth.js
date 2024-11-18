import { verifyToken } from "../utills/jsonwebtoken.js";

const AuthChecks = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default AuthChecks;
