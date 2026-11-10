const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const productos = await Product.getAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error en DB:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

const createProduct = async (req, res) => {
    try {
        const nuevoProducto = req.body;
        if (!nuevoProducto.nombre || !nuevoProducto.precio) {
            return res.status(400).json({ message: "Faltan datos del producto" });
        }
        
        const productoCreado = await Product.create(nuevoProducto);
        res.status(201).json(productoCreado);
    } catch (error) {
        console.error("Error en DB:", error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

module.exports = { getProducts, createProduct };