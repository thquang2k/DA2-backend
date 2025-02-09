const mongoose = require('mongoose')

const originSchema = new mongoose.Schema({
    origin_id: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    }
})

const originModel = mongoose.model("Origin", originSchema)

module.exports = originModel