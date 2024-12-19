import express from "express";

import {
  signUp,
  logIn,
  logOut,
  verifyEmail,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/verify-email", verifyEmail);

router.post("/login", logIn);

router.post("/logout", logOut);

export default router;
