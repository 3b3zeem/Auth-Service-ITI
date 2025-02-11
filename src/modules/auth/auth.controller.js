import { registerUser, loginUser } from "./service/auth.service.js";
import express from "express";
import User from "../../DB/models/User.model.js";
import {
  registerSchema,
  loginSchema,
  validate,
} from "../../middleware/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const { success, user, message, error } = await registerUser(req.body);

    if (success) {
      const userResponse = { ...user.toObject() };
      delete userResponse.password;
      delete userResponse.verificationToken;
      userResponse.phone = user.phone;

      res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
      });
    } else {
      res.status(400).json({ message, error });
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while registering the user",
      error: err.message,
    });
  }
});

router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { success, user, message, error } = await loginUser(
      req.body.email,
      req.body.password
    );

    if (success) {
      const userResponse = { ...user.toObject() };
      delete userResponse.password;
      userResponse.phone = user.phone;

      res.status(200).json({
        message: "Login successful",
        user: userResponse,
      });
    } else {
      res.status(401).json({ message, error });
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: err.message,
    });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "U r already Verified!",
      });
    }

    user.isVerified = true;
    await user.save({ validateModifiedOnly: true });

    res.json({
      success: true,
      message: "User verified successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during verification",
      error: err.message,
    });
  }
});

export default router;
