const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const productModel = mongoose.model('product', productSchema);

module.exports = {productModel};