const Product = require("../models/product");
const { success, error } = require("../utlis/responseWrapper");


// Controller function to create a new product
const createProduct = async (req, res) => {
    try {
        const {
            imageLink,
            productName,
            headphoneType,
            brandName,
            color,
            price,
            customerReviews,
            ratingStar,
            available,
            productDescription,
            productTitle,
            otherImageLink
        } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            imageLink,
            productName,
            headphoneType,
            brandName,
            color,
            price,
            customerReviews,
            ratingStar,
            available,
            productDescription,
            productTitle,
            otherImageLink
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        return res.status(201).json(success(200, "Successfull created the product", [savedProduct])); // Return the saved product
    } catch (err) {
        return res.status(400).json(error(400, "Error While createing the Product", []));
    }
};

// Controller function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(success(200, "Successfully created get the all the product", products));
    } catch (err) {
        return res.status(500).json(error(500, "Error While getting the all Products", [error.message]));
    }
};

// Controller function to get a product by its ID
const getProductById = async (req, res) => {
    try {
        const _id = req.body;
        const product = await Product.findById(_id);
        if (product) {
            return res.status(200).json(success(200, "Product Id", product));
        } else {
            res.status(404).json(error(200, "Product Id Not Found",[]));
        }
    } catch (err) {
        res.status(500).json(error(500, "Error while getting the product id", [error.message ]));
    }
};

const fetchDistinctValues = async (req, res) => {
    try {
        const brandNames = await Product.distinct('brandName');
        const colors = await Product.distinct('color');
        const headphoneTypes = await Product.distinct('headphoneType');

        // Manually define the price ranges
        const priceRange = [
            "0 - 1000",
            "1000 - 10000",
            "10000 - 20000"
        ];

        const categories = { brandNames, colors, headphoneTypes, priceRange };

        return res.status(200).json(success(200, "Successfully fetched the Categories", categories));
    } catch (err) {
        return res.status(500).json(error(500,"Error from the backend", err.message));
        throw new Error(`Error fetching distinct values: ${err.message}`);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    fetchDistinctValues
};
