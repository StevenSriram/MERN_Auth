import User from "../modals/user.modal.js";

import bcrypt from "bcryptjs";

import { generateJWT } from "../utils/generateJWT.js";
import { generateOTP } from "../utils/generateOTP.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("Missing Fields");
    }

    // * Check if user already exists
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User Already Exists");
    }

    // * Hash the Password
    const hashPassword = await bcrypt.hash(password, 10);

    // * Generate Random Verification Token
    const verificationToken = generateOTP();

    // * Create User and save to DB
    let user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    // ! Save User to DB
    await user.save();

    const token = generateJWT(res, user._id);

    user = { ...user._doc, password: undefined };

    return res.status(201).json({
      sucess: true,
      token,
      user,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

export const logIn = async (req, res) => {
  res.send("login");
};

export const logOut = async (req, res) => {
  res.send("logout");
};
