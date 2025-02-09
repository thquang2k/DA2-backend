const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: String,
        required: true
    },
    brand_id: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model("Product", productSchema)

module.exports = productModel