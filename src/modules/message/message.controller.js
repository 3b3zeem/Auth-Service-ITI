import Message from "../../DB/models/Message.model.js";

export const createMessageController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    const message = new Message({ content, userId });
    await message.save();

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create message",
      error: error.message,
    });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({ userId });

    if (messages.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No messages found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};

export const getAllMessagesController = async (req, res) => {
  try {
    const messages = await Message.find({});

    if (messages.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No messages found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
}

export const deleteMessageController = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findOne({ _id: messageId, userId });
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found or unauthorized",
      });
    }

    await Message.deleteOne({ _id: messageId, userId });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};

export const deleteAllMessagesController = async (req, res) => {
  try {
    await Message.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "All messages deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete messages",
      error: error.message,
    });
  }
};
