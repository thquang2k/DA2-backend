const mongoose = require('mongoose')

const cellphoneVariantSchema = new mongoose.Schema({
    variant_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String,
        required: true
    },
    variant_name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    promotion_id: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const cellphoneVariantModel = mongoose.model('Cellphone_Variant', cellphoneVariantSchema)

module.exports = cellphoneVariantModel