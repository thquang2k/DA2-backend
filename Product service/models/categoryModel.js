const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true,
        unique: true
    },
    category_name: {
        type: String,
        required: true
    }
})

const categoryModel = mongoose.model("Category", categorySchema)

module.exports = categoryModel