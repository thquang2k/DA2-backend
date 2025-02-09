const mongoose = require('mongoose')

const cellphoneSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    brand_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    cpu_brand: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    category_id: {
        type: String,
        default: "CP"
    },
    price: {
        type: Number,
        required: true
    },
    feature_img_src: {
        type: String
    }
},{
    timestamps: true
})

const cellphoneModel = mongoose.model("Cellphone", cellphoneSchema)

module.exports = cellphoneModel