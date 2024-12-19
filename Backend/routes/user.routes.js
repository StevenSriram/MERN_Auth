import express from "express";

import {
  signUp,
  logIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

// ? Signup and Verification
router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);

// ? Login and Logout
router.post("/login", logIn);
router.post("/logout", logOut);

// ? Forgot User Password
router.post("/forgot-password", forgotPassword);

// ? Reset User Password with Token
router.post("/reset-password/:token", resetPassword);

export default router;
