const mongoose = require('mongoose')

const imgVariantUploadSchema = new mongoose.Schema({
    img_id: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true
    },
    variant_id: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const imgVariantUploadModel = mongoose.model("Variant_Upload", imgVariantUploadSchema)

module.exports = imgVariantUploadModel