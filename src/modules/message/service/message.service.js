import Message from '../../../DB/models/Message.model.js';

// Create a new Message
export const createMessage = async (content, userId) => {
  const message = new Message({ content, userId });
  await message.save();
  return message;
};

// Get message created by a user 
export const getMessagesByUser = async (userId) => {
  return await Message.find({ userId });
};

// Delete a Message by user
export const deleteMessage = async (messageId, userId) => {
  const message = await Message.findOne({ _id: messageId, userId });
  if (!message) {
    throw new Error('Message not found or unauthorized');
  }
  await message.remove();
};