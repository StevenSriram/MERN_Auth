import User from "../modals/user.modal.js";

import bcrypt from "bcryptjs";

import { generateJWT } from "../utils/generateJWT.js";
import { generateOTP } from "../utils/generateOTP.js";

import { sendVerificationMail, sendWelcomeMail } from "../mail/sendMail.js";

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
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    // ! Save User to DB
    await user.save();

    const token = generateJWT(res, user._id);

    // ? Send Verification Email
    await sendVerificationMail(user.email, verificationToken);

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

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    let user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or Expired Verification Code");
    }

    user.isValid = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    // ! Update Verifaction of User
    await user.save();

    // ? Send Welcome Email
    await sendWelcomeMail(user.email, user.name);

    user = { ...user._doc, password: undefined };

    return res
      .status(200)
      .json({ sucess: true, user, message: "Email Verified" });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Missing Fields");
    }

    // * Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    // ? Is User Verified
    if (!user.isValid) {
      throw new Error("User Not Verified");
    }

    // * Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    // * Generate JWT Token
    const token = generateJWT(res, user._id);

    user.lastLogin = Date.now();

    // ! Update lastLogin of  User
    await user.save();

    user = { ...user._doc, password: undefined };

    return res
      .status(200)
      .json({ sucess: true, token, user, message: "Logged In Successfully" });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ sucess: true, message: "Logged Out Successfully" });
};
