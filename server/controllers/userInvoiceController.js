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

// Controller function to add a new invoice
const addInvoice = async (req, res) => {
    try {
        const {userId, name, purchaseDate, address, paymentMethod, orderItems, orderDelivery, products } = req.body;

        const newInvoice = new UserInvoice({
            userId,
            invoices: [{
                purchaseDate,
                address,
                name,
                paymentMethod,
                orderItems,
                orderDelivery,
                products
            }]
        });

        const savedInvoice = await newInvoice.save();
        return res.status(200).json({ success: true, message: "Invoice added successfully", data: savedInvoice });
    } catch (err) {
        console.error("Error adding invoice:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

module.exports = {
    userInvoiceController,
    addInvoice
};