const mongoose = require('mongoose')


const product = new mongoose.Schema({
    imageLink: {
        type: String,
        required: true,
    },

    productName: {
        type: String,
        required: true,
    },

    headphoneType: {
        type: String,
        required: true,
    },

    brandName: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    customerReviews: {
        type: Number,
        required: true,
    },
    ratingStar: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    productDescription: [
        {
            type: String,
        }
    ],
    productTitle: {
        type: String,
        required: true,
    },
    otherImageLink: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('Product', product)