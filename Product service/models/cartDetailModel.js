const mongoose = require('mongoose')

const cartDetailSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    variant_id: {
        type: String,
        required: true
    },
    product_img: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    variant_name: {
        type: String,
        required: true
    },
    variant_price: {
        type: Number,
        required: true
    },
    promotion_id: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    subtotal: {
        type: Number,
        default: 0
    }
})

const cartDetailModel = mongoose.model("Cart_Detail", cartDetailSchema)

module.exports = cartDetailModel