const mysql = require('mysql2/promise');

// 🔌 Creamos el puente de conexión a XAMPP
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Usuario por defecto de XAMPP
    password: '', // Sin contraseña por defecto
    database: 'polimarket'
});

const Product = {
    // Función para obtener todos los productos desde MySQL
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows;
    },
    
    // Función para guardar un producto real en MySQL
    create: async (nuevoProducto) => {
        const { nombre, precio, vendedor, categoria } = nuevoProducto;
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, vendedor, categoria) VALUES (?, ?, ?, ?)',
            [nombre, precio, vendedor, categoria]
        );
        return { id: result.insertId, ...nuevoProducto };
    }
};

module.exports = Product;