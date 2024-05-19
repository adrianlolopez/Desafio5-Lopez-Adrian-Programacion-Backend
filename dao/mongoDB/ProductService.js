const Product = require('../models/Product');

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.error(`Error al obtener producto con ID ${productId}:`, error);
    throw error;
  }
}

async function createProduct(productData) {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}

async function updateProduct(productId, newData) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
    return updatedProduct;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${productId}:`, error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${productId}:`, error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
