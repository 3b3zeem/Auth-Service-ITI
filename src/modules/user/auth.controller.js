import express from "express";
import User from "../../DB/models/User.model.js";
import upload from "./uploadImage.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    const formattedUsers = users.map((user) => {
      const userObject = user.toObject(); 

      if (!userObject.isVerified) {
        delete userObject.verificationToken;
      }

      return userObject;
    });
    res.status(200).json({ success: true, formattedUsers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users", error: err.message });
  }
});

// Delete all users
router.delete("/users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All users deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting all users",
      error: err.message,
    });
  }
});

// Delete user by id
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: err.message,
    });
  }
});

// Search for users by email
router.get("/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user",
      error: err.message,
    });
  }
});

// Upload profile image
router.post(
  "/users/:id/upload",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      if (user.profileImage === req.file.filename) {
        return res.status(400).json({
          success: false,
          message: "You are trying to upload the same image",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { profileImage: req.file.filename },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile image uploaded successfully",
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "An error occurred while uploading the profile image",
        error: err.message,
      });
    }
  }
);

export default router;