const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    total_item: {
        type: Number,
        default: 0
    },
    total_price: {
        type: Number,
        default: 0
    }
})

const cartModel = mongoose.model("Cart", cartSchema)

module.exports = cartModel