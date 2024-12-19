import express from "express";

import {
  signUp,
  logIn,
  logOut,
  verifyEmail,
  forgotPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);

router.post("/login", logIn);

router.post("/logout", logOut);

router.post("/forgot-password", forgotPassword);

export default router;
