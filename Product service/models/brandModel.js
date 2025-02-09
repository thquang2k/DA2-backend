const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brand_id: {
        type: String,
        required: true,
        unique: true
    },
    brand_name: {
        type: String,
        required: true
    }
})

const brandModel = mongoose.model("Brand", brandSchema)

module.exports = brandModel