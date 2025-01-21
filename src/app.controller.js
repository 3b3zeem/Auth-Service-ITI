import express from "express";
import connectDB from "./DB/connection.js";
import authRoutes from "./modules/auth/auth.controller.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to DB
connectDB();

export default app;