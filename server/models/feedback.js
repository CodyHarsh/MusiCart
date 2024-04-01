const mongoose = require('mongoose');

const feedbackModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,

    }
})


module.exports = mongoose.model("feedback", feedbackModel);