const AddToCart = require('../models/addToCart');
const Product = require('../models/product');
const UserInvoice = require('../models/userInvoice');
const { success, error } = require('../utlis/responseWrapper');


// Get all invoices
const userInvoiceController = async (req, res) => {
    try {
        const { userId } = req.body;
        const userInvoice = await UserInvoice.findOne({ userId });
        if (!userInvoice) {
            return res.status(404).json(error(404, "User invoice not found", null));
        }
        return res.status(200).json(success(200, "User invoice retrieved successfully", userInvoice));
    } catch (err) {
        console.error("Error fetching user invoice:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

// const getSingleInvoice = async (req, res) => {
//     const {userId, id} = req.body;
//     const userInvoice = await UserInvoice.findOne({ userId });
//     if (!userInvoice) {
//         return res.status(404).json(error(404, "User invoice not found", null));
//     }

   

//     const productsArray = [];
//     // for(const item of userInvoice.invoices[productArrayIndex].products){ 
//     //     const product = await Product.findById(item.productId);
//     //     if (!product) {
//     //         // If product not found, handle accordingly
//     //         //return res.status(404).json(404, "Products Not Found In Invoice", null);
//     //         console.log(`Product with ID ${item.productId} not found`);
//     //         continue;
//     //     }
//     //     productsArray.push(product);
//     // }

//     return res.status(200).json(success(200, "Invoice Founded", {
//         invoicesData: userInvoice.invoices[productArrayIndex],
//         productData: productsArray
//     }))

// }
const getSingleInvoice = async (req, res) => {
    const { userId, invoiceId } = req.body; // Assuming invoiceId is the unique ID of the invoice
    try {
        const userInvoice = await UserInvoice.findOne({ userId });
        if (!userInvoice) {
            return res.status(404).json(error(404, "User invoice not found", null));
        }

        const invoice = userInvoice.invoices.find(invoice => invoice._id.toString() === invoiceId);
        if (!invoice) {
            return res.status(404).json(error(404, "Invoice not found", null));
        }

        const productIds = invoice.products.map(product => product.productId);

        // Fetch products associated with productIds
        const products = await Product.find({ _id: { $in: productIds } });
        
        return res.status(200).json(success(200, "Invoice and Products Found", {
            invoiceData: invoice,
            productData: products
        }));
    } catch (error) {
        console.error("Error fetching invoice and products:", error);
        return res.status(500).json(error(500, "Internal Server Error", null));
    }
}

 
// Controller function to add a new invoice
const addInvoice = async (req, res) => {
    try {
        const { userId, name, purchaseDate, address, paymentMethod, orderItems, orderDelivery, products } = req.body;

        // Create the invoice object
        const newInvoice = {
            purchaseDate,
            address,
            name,
            paymentMethod,
            orderItems,
            orderDelivery,
            products
        };

        // Update the invoices array in the UserInvoice document
        const updatedUser = await UserInvoice.findOneAndUpdate(
            { userId },
            { $push: { invoices: newInvoice } },
            { new: true, upsert: true }
        );

        // Delete the user from AddToCart collection
        const deleteTheUser = await AddToCart.findOneAndDelete({ name: userId });

        return res.status(200).json(success(200, "Invoice Saved", updatedUser));
    } catch (err) {
        console.error("Error adding invoice:", err);
        return res.status(500).json(error(500, "Internal Server Error", err.message));
    }
};

module.exports = {
    userInvoiceController,
    addInvoice,
    getSingleInvoice
};