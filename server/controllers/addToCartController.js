const AddToCart = require('../models/addToCart');
const { success, error } = require('../utlis/responseWrapper');

// Add an entry to addToCart
const addEntryToCart = async (req, res) => {
    try {
        const { name, productId, quantity } = req.body;
        let cart = await AddToCart.findOne({ name });

        if (!cart) {
            // If the user's cart doesn't exist, create a new one
            cart = new AddToCart({ name, products: [{ productId, quantity }] });
        } else {
            // If the user's cart exists, update the products array
            const productIndex = cart.products.findIndex(item => item.productId == productId);
            if (productIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                cart.products[productIndex].quantity = quantity;
            } else {
                // If the product doesn't exist in the cart, add it
                cart.products.push({ productId, quantity });
            }
        }

        const savedCart = await cart.save();
        return res.status(201).json(success(201, "Product added to cart successfully", savedCart));
    } catch (err) {
        console.error("Error adding product to cart:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

// Remove a particular product from addToCart
const removeProductFromCart = async (req, res) => {
    try {
        const { name, productId } = req.body;
        const cart = await AddToCart.findOne({ name });

        if (!cart) {
            return res.status(404).json(error(404, "User's cart not found", null));
        }

        // Filter out the product to be removed
        cart.products = cart.products.filter(item => item.productId != productId);
        const savedCart = await cart.save();

        return res.status(200).json(success(200, "Product removed from cart successfully", savedCart));
    } catch (err) {
        console.error("Error removing product from cart:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

// Delete the entire addToCart information from the database
const deleteCart = async (req, res) => {
    try {
        const { name } = req.body;
        const deletedCart = await AddToCart.findOneAndDelete({ name });

        if (!deletedCart) {
            return res.status(404).json(error(404, "User's cart not found", null));
        }

        return res.status(200).json(success(200, "Cart deleted successfully", deletedCart));
    } catch (err) {
        console.error("Error deleting cart:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

module.exports = {
    addEntryToCart,
    removeProductFromCart,
    deleteCart
};
