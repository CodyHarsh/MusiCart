const express = require('express');
const loginController  = require('../controllers/loginController');
const signupController  = require('../controllers/signUpController');
const feedbackController = require('../controllers/feedbackController');
const { userInvoiceController, addInvoice } = require('../controllers/userInvoiceController');
const { addEntryToCart, removeProductFromCart, deleteCart } = require('../controllers/addToCartController');
const userRoute = express.Router();

userRoute.post("/login", loginController);
userRoute.post("/signup", signupController);
userRoute.post("/feedback", feedbackController);
userRoute.post("/invoices", userInvoiceController);
userRoute.post("/addInvoice", addInvoice)
userRoute.post("/add-to-cart", addEntryToCart);
userRoute.post("/remove-from-cart", removeProductFromCart);
userRoute.post("/delete-cart", deleteCart);

module.exports = userRoute;