import express from "express";

import { verifyJWT } from "../middleware/verifyJWT.js";

import {
  signUp,
  logIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuthenticated,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).send("API Routes...");
});

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

// ? Check Authenticated
router.get("/check-auth", verifyJWT, checkAuthenticated);

export default router;
