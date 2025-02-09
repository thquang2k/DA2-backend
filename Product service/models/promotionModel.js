const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema({
    promotion_id: {
        type: String,
        required: true,
        unique: true
    },
    promotion_name: {
        type: String,
        required: true
    },
    promotion_rate: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
})

const promotionModel = mongoose.model("Promotion", promotionSchema)

module.exports = promotionModel