const Message = require('../models/Message');

async function getAllMessages() {
  try {
    const messages = await Message.find();
    return messages;
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    throw error;
  }
}

async function getMessageById(messageId) {
  try {
    const message = await Message.findById(messageId);
    return message;
  } catch (error) {
    console.error(`Error al obtener mensaje con ID ${messageId}:`, error);
    throw error;
  }
}

async function createMessage(messageData) {
  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    return newMessage;
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    throw error;
  }
}

async function updateMessage(messageId, newData) {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, newData, { new: true });
    return updatedMessage;
  } catch (error) {
    console.error(`Error al actualizar mensaje con ID ${messageId}:`, error);
    throw error;
  }
}

async function deleteMessage(messageId) {
  try {
    await Message.findByIdAndDelete(messageId);
  } catch (error) {
    console.error(`Error al eliminar mensaje con ID ${messageId}:`, error);
    throw error;
  }
}

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
