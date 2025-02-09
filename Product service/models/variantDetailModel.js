const mongoose = require('mongoose')

const variantDetailSchema = new mongoose.Schema({
    detail_id: {
        type: String,
        required: true,
        unique: true
    },
    variant_id: {
        type: String,
        required: true,
        unique: true
    },
    variant_field_id: {
        type: String,
        unique: true,
        required: true
    }
})

const variantDetailModel = mongoose.model("Variant_Detail", variantDetailSchema)

module.exports = variantDetailModel