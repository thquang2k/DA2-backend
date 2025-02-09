const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    coupon_id: {
        type: String,
        required: true
    },
    discount_rate: {
        type: Number,
        default: 0
    },
    discount_amount: {
        type: Number,
        default: 0
    },
    is_used: {
        type: Boolean,
        default: false
    },
    expired_at: {
        type: Date,
        required: true
    }
})

const couponModel = mongoose.model("Coupon", couponSchema)

module.exports = couponModel