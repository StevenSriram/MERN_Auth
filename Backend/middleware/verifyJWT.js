import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (!token) {
      throw new Error("Unauthorized - No Token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Invalid Token");
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ sucess: false, message: error.message });
  }
};
