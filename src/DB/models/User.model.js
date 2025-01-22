import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
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
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

userSchema.methods.generateVerificationToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  this.verificationToken = token;
  return token;
};

export default mongoose.model("User", userSchema);