const express = require('express');
const { createProduct, getAllProducts, getProductById, fetchDistinctValues } = require('../controllers/productController');
const productFilterController = require('../controllers/productFilterController');
const productRoute = express.Router();


productRoute.post('/createproduct', createProduct);
productRoute.get('/getproduct', getAllProducts);
productRoute.post('/getproductbyid', getProductById);
productRoute.get('/getCategories' , fetchDistinctValues);
productRoute.get('/filter', productFilterController);

module.exports= productRoute;