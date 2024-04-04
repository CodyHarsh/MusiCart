const AddToCart = require('../models/addToCart');
const User = require('../models/user');
const Product = require('../models/product');
const { success, error } = require('../utlis/responseWrapper');

// Add an entry to addToCart
// const addEntryToCart = async (req, res) => {
//     try {
//         const { productId,quantity } = req.body;
//         const name = req.body.userId;
        
//         let userInDatabasee = await User.exists({_id: name});
//         if(!userInDatabasee){
//             return res.status(201).json(error(201, "User Not Exist in Databse", []))
//         }

//         let cart = await AddToCart.findOne({ name });
        

//         if (!cart) {
//             // If the user's cart doesn't exist, create a new one
//             cart = new AddToCart({ name, products: [{ productId, quantity }] });
//         } else {
//             // If the user's cart exists, update the products array
//             const productIndex = cart.products.findIndex(item => item.productId == productId);
//             if (productIndex !== -1) {
//                 // If the product already exists in the cart, update its quantity
//                     if(quantity === 1){
//                         cart.products[productIndex].quantity += quantity;
//                     }else{
//                         cart.products[productIndex].quantity = quantity;
//                     }
                    
//             } else {
//                 // If the product doesn't exist in the cart, add it
//                 cart.products.push({ productId, quantity });
//             }
//         }

//         const savedCart = await cart.save();
//         return res.status(201).json(success(201, "Product added to cart successfully", savedCart));
//     } catch (err) {
//         console.error("Error adding product to cart:", err);
//         return res.status(500).json(error(500, "Internal Server Error", err.message));
//     }
// };


//Update the quantity:
const addEntryToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const name = req.body.userId;
        
        let userInDatabasee = await User.exists({_id: name});
        if(!userInDatabasee){
            return res.status(201).json(error(201, "User Not Exist in Databse", []))
        }

        let cart = await AddToCart.findOne({ name });
        
        if (!cart) {
            // If the user's cart doesn't exist, create a new one
            cart = new AddToCart({ name, products: [{ productId, quantity: 1 }] });
        } else {
            // If the user's cart exists, update the products array
            const productIndex = cart.products.findIndex(item => item.productId == productId);
            
            if (productIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                if(cart.products[productIndex].quantity >= 8){
                    return res.status(200).json(error(201, "You Can Add Maximum 8 products", []));
                }else{
                    cart.products[productIndex].quantity += 1;
                }
                
            } else {
                // If the product doesn't exist in the cart, add it
                cart.products.push({ productId, quantity: 1 });
            }
        }

        const savedCart = await cart.save();
        return res.status(201).json(success(201, "Product added to cart successfully", savedCart));
    } catch (err) {
        console.error("Error adding product to cart:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

//Update the quantity:
const updateTheQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const name = req.body.userId;
        
        let userInDatabasee = await User.exists({_id: name});
        if(!userInDatabasee){
            return res.status(201).json(error(201, "User Not Exist in Databse", []))
        }

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
        const {name} = req.body.user;
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


const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        // Find the user's cart by user ID
        const userCart = await AddToCart.findOne({ name: userId });
        if (!userCart) {
            return res.status(404).json(error(404, 'Cart not found for the user.'));
        }

        let totalPrice = 0;
        let totalQuantity = 0;
        let productsArray = [];

        // Fetch product details for each product in the user's cart
        for (const item of userCart.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                // If product not found, handle accordingly
                console.log(`Product with ID ${item.productId} not found`);
                continue;
            }

            const quantity = item.quantity;

            // Calculate total price and total quantity
            totalPrice += product.price * quantity;
            totalQuantity += quantity;

            // Build product object
            const productObj = {
               product,
               productQuantity: item.quantity,
            };
            productsArray.push(productObj);
        }

        // Respond with cart details, total quantity, total price, and products array
        return res.json(success(200, 'Cart details fetched successfully', {
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
            products: productsArray
        }));
    } catch (err) {
        console.error('Error retrieving user cart:', err);
        return res.status(500).json(error(500, 'Internal server error', err.message));
    }
};
module.exports = {
    addEntryToCart,
    removeProductFromCart,
    deleteCart,
    getCart,
    updateTheQuantity
};
