const mongoose = require('mongoose');

const userInvoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    invoices: [
        {
            purchaseDate: {
                type: Date,
                required: true
            },
            address: {
                type: String,
                required: true,
            },
            name: {
                type: String, 
                required: true,
            },
            paymentMethod:{
                type: String,
                required: true,
            },
            orderItems:{
                type: Number,
                required: true,
            },
            orderDelivery: {
                type: Number,
                required: true,
            },
            products: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                    },
                }
            ]
        }
    ]
});

const UserInvoice = mongoose.model('UserInvoice', userInvoiceSchema);

module.exports = UserInvoice;
