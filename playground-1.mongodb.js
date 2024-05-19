const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
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

// Definición de un esquema y modelo de ejemplo
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

const Product = mongoose.model('Product', productSchema);

// Operaciones de base de datos de ejemplo
async function run() {
  // Crear un nuevo producto
  const newProduct = new Product({
    name: 'Producto de prueba',
    price: 10,
    category: 'Pruebas'
  });
  await newProduct.save();
  console.log('Producto creado:', newProduct);

  // Consultar todos los productos
  const allProducts = await Product.find();
  console.log('Todos los productos:', allProducts);

  // Actualizar un producto
  const productToUpdate = await Product.findOne({ name: 'Producto de prueba' });
  productToUpdate.price = 15;
  await productToUpdate.save();
  console.log('Producto actualizado:', productToUpdate);

  // Eliminar un producto
  const productToDelete = await Product.findOne({ name: 'Producto de prueba' });
  await productToDelete.remove();
  console.log('Producto eliminado:', productToDelete);
}

// Ejecutar las operaciones de base de datos
run()
.then(() => {
  // Cerrar la conexión a la base de datos después de completar las operaciones
  mongoose.disconnect();
})
.catch((error) => {
  console.error('Error en las operaciones de base de datos:', error);
});
