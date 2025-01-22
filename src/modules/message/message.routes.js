import express from "express";
import {
  createMessageController,
  getMessagesController,
  getAllMessagesController,
  deleteMessageController,
  deleteAllMessagesController
} from "./message.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/messages", authMiddleware, createMessageController);
router.get("/messages", authMiddleware, getMessagesController);
router.get("/messages/AllMessages", getAllMessagesController);
router.delete("/messages/:messageId", authMiddleware, deleteMessageController);
router.delete("/messages", deleteAllMessagesController);

export default router;
