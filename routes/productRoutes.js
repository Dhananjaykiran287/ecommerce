const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);

// Get a specific product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/:id', productController.deleteProductById);

// Add variant to a product
router.post('/:id/variants', productController.addVariantToProduct);

// Update variant of a product by variant ID
router.put('/:id/variants/:variantId', productController.updateVariantById);

// Delete variant of a product by variant ID
router.delete('/:id/variants/:variantId', productController.deleteVariantById);


module.exports = router;
