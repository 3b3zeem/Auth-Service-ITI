import User from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../../email/email.js";
import { html } from "../../email/html.design.js";

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

    const user = new User(userData);
    await user.save();

    let userName = user.userName;

    const emailOptions = {
      to: user.email,
      subject: "Welcome to My Sara7a App! 🎉",
      text: `Hello ${user.userName}, welcome to MyApp!`,
      html: html(userName),
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

export { registerUser, loginUser };
