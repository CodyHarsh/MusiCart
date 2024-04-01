const Product = require("../models/product");
const { success, error } = require("../utlis/responseWrapper");

// Route for fetching distinct values and filtering/sorting products
const productFilterController =  async (req, res) => {
    try {
        // Extract query parameters
        const { name, brandName, color, headphoneType, priceRange, sortBy } = req.query;

        // Build filter object based on query parameters
        const filter = {};
        if (name) {
            filter.$or = [
                { productName: { $regex: new RegExp(name, 'i') } }, // Partial substring match for productName
                { brandName: { $regex: new RegExp(name, 'i') } } // Partial substring match for brandName
            ];
        }// Case-insensitive search by product name
        if (brandName) filter.brandName = brandName;
        if (color) filter.color = color;
        if (headphoneType) filter.headphoneType = headphoneType;
        
        // Filter by price range
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split(' - ');
            filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        }

        // Sort by price or name based on sortBy query parameter
        let sort = {};
        if (sortBy === 'priceLowest') sort = { price: 1 };
        else if (sortBy === 'priceHighest') sort = { price: -1 };
        else if (sortBy === 'nameAZ') sort = { productName: 1 };
        else if (sortBy === 'nameZA') sort = { productName: -1 };

        // Call controller function to fetch filtered/sorted products
        const products = await Product.find(filter).sort(sort);

        // Return success response with distinct values and filtered/sorted products
        return res.json(success(200, "Products fetched successfully", products ));
    } catch (err) {
        // Return error response
        console.log("ERROR: ", err)
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
}

module.exports = productFilterController;