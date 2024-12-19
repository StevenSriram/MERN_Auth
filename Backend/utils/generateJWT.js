import jwt from "jsonwebtoken";

export const generateJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // * XSS - Cross Site Script
    secure: process.env.NODE_ENV === "production", // * HTTPS
    sameSite: "strict", // * CSRF - Cross Site Request Forgery
    maxAge: 1000 * 60 * 60 * 24 * 7, // * 7 day
  });

  return token;
};
