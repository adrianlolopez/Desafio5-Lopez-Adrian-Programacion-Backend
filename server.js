// Importar las dependencias
const express = require('express');
const exphbs  = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar el directorio de vistas
app.set('views', __dirname + '/views');

// Datos de ejemplo para la lista de productos
let products = [];

// Rutas
app.get('/', (req, res) => {
  res.render('home', { products: products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: products });
});

// Manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Escuchar el evento 'addProduct' y emitir el evento 'newProduct' a todos los clientes
  socket.on('addProduct', (product) => {
    products.push(product);
    io.emit('newProduct', product);
  });

  // Escuchar el evento 'deleteProduct' y emitir el evento 'deleteProduct' a todos los clientes
  socket.on('deleteProduct', (product) => {
    products = products.filter(p => p !== product);
    io.emit('deleteProduct', product);
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
