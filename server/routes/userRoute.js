const express = require('express');
const loginController  = require('../controllers/loginController');
const signupController  = require('../controllers/signUpController');
const feedbackController = require('../controllers/feedbackController');
const { userInvoiceController, addInvoice } = require('../controllers/userInvoiceController');
const { addEntryToCart, removeProductFromCart, deleteCart, getCart, updateTheQuantity } = require('../controllers/addToCartController');
const { fetchUser } = require('../middleware/auth')
const userRoute = express.Router();


userRoute.post("/login", loginController);
userRoute.post("/signup", signupController);
userRoute.post("/feedback",fetchUser, feedbackController);
userRoute.post("/invoices", fetchUser, userInvoiceController);
userRoute.post("/addInvoice",fetchUser, addInvoice);
userRoute.post("/add-to-cart",fetchUser, addEntryToCart);
userRoute.post("/getCart" , fetchUser, getCart);
userRoute.post("/remove-from-cart", fetchUser, removeProductFromCart);
userRoute.post("/updateQuantity", fetchUser, updateTheQuantity);


userRoute.post("/delete-cart", deleteCart);

module.exports = userRoute;