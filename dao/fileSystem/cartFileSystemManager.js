const fs = require('fs');
const path = require('path');

const CARTS_DIR = path.join(__dirname, '../../data/carts');

function getAllCarts() {
  return new Promise((resolve, reject) => {
    fs.readdir(CARTS_DIR, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const carts = files.map(file => JSON.parse(fs.readFileSync(path.join(CARTS_DIR, file))));
        resolve(carts);
      }
    });
  });
}

function getCartById(cartId) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(CARTS_DIR, `${cartId}.json`), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function createCart(cartData) {
  return new Promise((resolve, reject) => {
    const cartId = Date.now().toString();
    const cartFileName = `${cartId}.json`;
    const filePath = path.join(CARTS_DIR, cartFileName);
    const dataToWrite = JSON.stringify({ ...cartData, id: cartId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...cartData, id: cartId });
      }
    });
  });
}

function updateCart(cartId, newData) {
  return new Promise((resolve, reject) => {
    const cartFileName = `${cartId}.json`;
    const filePath = path.join(CARTS_DIR, cartFileName);
    const dataToWrite = JSON.stringify({ ...newData, id: cartId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...newData, id: cartId });
      }
    });
  });
}

function deleteCart(cartId) {
  return new Promise((resolve, reject) => {
    const cartFileName = `${cartId}.json`;
    const filePath = path.join(CARTS_DIR, cartFileName);

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
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
