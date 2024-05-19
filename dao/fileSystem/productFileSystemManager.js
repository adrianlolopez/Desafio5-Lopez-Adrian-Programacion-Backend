const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../../data/products');

function getAllProducts() {
  return new Promise((resolve, reject) => {
    fs.readdir(PRODUCTS_DIR, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const products = files.map(file => JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file))));
        resolve(products);
      }
    });
  });
}

function getProductById(productId) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(PRODUCTS_DIR, `${productId}.json`), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function createProduct(productData) {
  return new Promise((resolve, reject) => {
    const productId = Date.now().toString();
    const productFileName = `${productId}.json`;
    const filePath = path.join(PRODUCTS_DIR, productFileName);
    const dataToWrite = JSON.stringify({ ...productData, id: productId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...productData, id: productId });
      }
    });
  });
}

function updateProduct(productId, newData) {
  return new Promise((resolve, reject) => {
    const productFileName = `${productId}.json`;
    const filePath = path.join(PRODUCTS_DIR, productFileName);
    const dataToWrite = JSON.stringify({ ...newData, id: productId });

    fs.writeFile(filePath, dataToWrite, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...newData, id: productId });
      }
    });
  });
}

function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    const productFileName = `${productId}.json`;
    const filePath = path.join(PRODUCTS_DIR, productFileName);

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
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
