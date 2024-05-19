const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../../data/messages');

function getAllMessages() {
  return new Promise((resolve, reject) => {
    fs.readdir(MESSAGES_DIR, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const messages = files.map(file => JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file))));
        resolve(messages);
      }
    });
  });
}

function getMessageById(messageId) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(MESSAGES_DIR, `${messageId}.json`), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function createMessage(messageData) {
  return new Promise((resolve, reject) => {
    const messageId = Date.now().toString();
    const messageFileName = `${messageId}.json`;
    const filePath = path.join(MESSAGES_DIR, messageFileName);
    const dataToWrite = JSON.stringify({ ...messageData, id: messageId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...messageData, id: messageId });
      }
    });
  });
}

function updateMessage(messageId, newData) {
  return new Promise((resolve, reject) => {
    const messageFileName = `${messageId}.json`;
    const filePath = path.join(MESSAGES_DIR, messageFileName);
    const dataToWrite = JSON.stringify({ ...newData, id: messageId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...newData, id: messageId });
      }
    });
  });
}

function deleteMessage(messageId) {
  return new Promise((resolve, reject) => {
    const messageFileName = `${messageId}.json`;
    const filePath = path.join(MESSAGES_DIR, messageFileName);

    fs.unlink(filePath, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
