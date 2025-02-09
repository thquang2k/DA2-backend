const mongoose = require('mongoose')

const addressSchema  = new mongoose.Schema({
    address_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    avenue: {
        type: String,
        required: true
    },
    specific: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
})

const addressModel = mongoose.model('Address', addressSchema)

module.exports = addressModel