// Importar las dependencias
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Importar los managers de MongoDB
const { getAllCarts, getCartById, createCart, updateCart, deleteCart } = require('./dao/mongoDB/CartService');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./dao/mongoDB/ProductService');
const { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage } = require('./dao/mongoDB/MessageService');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb+srv://ecommerce:futbol2000@ecommerce.9mgamyh.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión exitosa a la base de datos MongoDB');
})
.catch((error) => {
  console.error('Error de conexión a la base de datos MongoDB:', error);
});

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar el directorio de vistas
app.set('views', __dirname + '/views');

// Rutas
app.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await getAllProducts();
  res.render('realTimeProducts', { products });
});

// Manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Escuchar el evento 'addProduct' y emitir el evento 'newProduct' a todos los clientes
  socket.on('addProduct', async (productName) => {
    const newProduct = await createProduct({ name: productName });
    io.emit('newProduct', newProduct);
  });

  // Escuchar el evento 'deleteProduct' y emitir el evento 'deleteProduct' a todos los clientes
  socket.on('deleteProduct', async (productId) => {
    await deleteProduct(productId);
    io.emit('deleteProduct', productId);
  });

  // Manejar desconexiones de clientes
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
