import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address (e.g., user@example.com)",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      set: (phone) => {
        return CryptoJS.AES.encrypt(
          phone,
          process.env.ENCRYPTION_KEY
        ).toString();
      },
      get: (phone) => {
        const bytes = CryptoJS.AES.decrypt(phone, process.env.ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default mongoose.model("User", userSchema);
