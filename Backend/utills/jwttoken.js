import jwt from "jsonwebtoken";

const generateToken = (userId, isAdmin, isOwner) => {
  return jwt.sign({ userId, isAdmin, isOwner }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
