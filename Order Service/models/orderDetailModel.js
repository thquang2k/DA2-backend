const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    variant_id: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    promotion_id: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    product_img: {
        type: String
    }
})

const orderDetailModel = mongoose.model("Order_Detail", orderDetailSchema)

module.exports = orderDetailModel