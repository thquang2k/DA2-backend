const mongoose = require('mongoose')

const laptopSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    brand_id: {
        type: String,
        required: true,
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
    vga_brand: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    category_id: {
        type: String,
        default: "LT"
    },
    price: {
        type: Number,
        required: true
    },
    feature_img_src: {
        type: String
    }
},
{
    timestamps: true
})

const laptopModel = mongoose.model("Laptop", laptopSchema)

module.exports = laptopModel