const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Cuando el frontend pida GET a /api/productos, ejecuta getProducts
router.get('/', productController.getProducts);

// Cuando el frontend mande POST a /api/productos, ejecuta createProduct
router.post('/', productController.createProduct);

module.exports = router;