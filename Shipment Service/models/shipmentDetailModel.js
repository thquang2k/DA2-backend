const mongoose = require('mongoose')

const shipmentDetailSchema  = new mongoose.Schema({
    shipment_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
})

const shipmentDetailModel = mongoose.model('Shipment_Detail', shipmentDetailSchema)

module.exports = shipmentDetailModel