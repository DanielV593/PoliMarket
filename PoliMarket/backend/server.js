// backend/server.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); // Permite recibir datos en formato JSON (como al crear productos)

// 🔥 Conectar las Rutas MVC
app.use('/api/productos', productRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend de PoliMarket corriendo en http://localhost:${PORT}`);
});