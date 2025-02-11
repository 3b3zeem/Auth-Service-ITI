import User from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../../../utils/email.js";
import { html } from "../../../utils/html.design.js";
import jwt from 'jsonwebtoken';

const registerUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const existingUserName = await User.findOne({
      userName: userData.userName,
    });
    if (existingUserName) {
      return { success: false, message: "Username already exists" };
    }

    if (!userData.confirmPassword) {
      return { success: false, message: "Confirm password is required" };
    }

    if (userData.password !== userData.confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const user = new User(userData);
    const token = user.generateVerificationToken();
    await user.save();

    let userName = user.userName;

    const emailOptions = {
      to: user.email,
      subject: "Welcome to My Sara7a App! 🎉",
      text: `Hello ${user.userName}, welcome to MyApp!`,
      html: html(userName, token),
    };

    await sendEmail(emailOptions);
    
    return {
      success: true,
      user,
      message: "Successfully registered",
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Registration failed",
      error: error.message,
    };
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid Password" };
    }

    return {
      success: true,
      user,
      message: "Successfully logged",
    };
  } catch (error) {
    return {
      success: false,
      message: "Login failed",
      error: error.message,
    };
  }
};

const verifyUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    user.verificationToken = undefined;
    await user.save();

    return {
      success: true,
      user,
      message: "User verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Verification failed",
      error: error.message,
    };
  }
};

export { registerUser, loginUser, verifyUser };
