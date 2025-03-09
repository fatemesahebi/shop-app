const express = require('express');
const router = express.Router();
const { getProductById, getAllProducts, updateProductById, deleteProductById, createProduct } = require('../services/ProductController');

router.post('/createProduct', createProduct);
router.get('/getProductById/:ProductId', getProductById);
router.get('/getAllProducts', getAllProducts);
router.put('/updateProductById/:id', updateProductById);
router.delete('/deleteProductById/:id', deleteProductById);

module.exports = router;