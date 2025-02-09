const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    })

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel