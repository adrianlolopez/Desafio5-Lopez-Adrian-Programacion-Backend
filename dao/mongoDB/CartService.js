const Cart = require('../models/Cart');

async function getAllCarts() {
  try {
    const carts = await Cart.find();
    return carts;
  } catch (error) {
    console.error('Error al obtener carritos:', error);
    throw error;
  }
}

async function getCartById(cartId) {
  try {
    const cart = await Cart.findById(cartId);
    return cart;
  } catch (error) {
    console.error(`Error al obtener carrito con ID ${cartId}:`, error);
    throw error;
  }
}

async function createCart(cartData) {
  try {
    const newCart = new Cart(cartData);
    await newCart.save();
    return newCart;
  } catch (error) {
    console.error('Error al crear carrito:', error);
    throw error;
  }
}

async function updateCart(cartId, newData) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, newData, { new: true });
    return updatedCart;
  } catch (error) {
    console.error(`Error al actualizar carrito con ID ${cartId}:`, error);
    throw error;
  }
}

async function deleteCart(cartId) {
  try {
    await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    console.error(`Error al eliminar carrito con ID ${cartId}:`, error);
    throw error;
  }
}

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
