import { registerUser, loginUser } from "./service/auth.service.js";
import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { success, user, message, error } = await registerUser(req.body);
    if (success) {
      const userResponse = { ...user.toObject() };
      delete userResponse.password;
      userResponse.phone = user.phone;
      
      res
        .status(201)
        .send({ message: "User registered successfully", user: userResponse });
    } else {
      res.status(400).send({ message, error });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { success, user, message, error } = await loginUser(
    req.body.email,
    req.body.password
  );
  if (success) {
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    userResponse.phone = user.phone;

    res.send({ message: "Login successful", user: userResponse });
  } else {
    res.status(400).send({ message, error });
  }
});

export default router;
