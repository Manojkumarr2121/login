const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model('contact', contactSchema);
