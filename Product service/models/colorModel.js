const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    color_id: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
})

const colorModel = mongoose.model("Color", colorSchema)

module.exports = colorModel