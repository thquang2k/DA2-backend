const mongoose = require('mongoose')

const variantUploadSchema = new mongoose.Schema({
    upload_id: {
        type: String,
        required: true,
        unique: true
    },
    variant_id: {
        type: String
    },
    upload_src: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const variantUploadModel = mongoose.model("Variant_Upload", variantUploadSchema)

module.exports = variantUploadModel