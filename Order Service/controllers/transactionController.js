const axios = require('axios')

const Transaction = require('../models/transactionModel')

const getAllTransaction = async (req, res, next) => {
    try {
        let transactions = await Transaction.find()
        return res.status(200).json({
            success: true,
            message: `Get all transactions succeeded`,
            transactions: transactions
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}
const getTransactionById = async (req, res, next) => {
    try {
        let transactionId = req.params.transactionId
        let transaction = await Transaction.findOne({transaction_id: transactionId})
        if(!transaction){
            return res.status(400).json({
                success: true,
                message: `Transaction with ID ${transactionId} is not exist`,
            })
        }

        return res.status(200).json({
            success: true,
            message: `Get all transactions succeeded`,
            transaction: transaction
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getTransactionCurrentUser = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let config = {
            headers: {
                authorization: header
            }
        }
        let userData = await axios.get(`${process.env.USER_SERVICE_URL}/users/fetch`, config)
        if(!userData){
            return res.status(400).json({
                success: false,
                message: `Cannot fetch data user from user service`
            })
        }
        let user = userData.data.user

        let transactions = await Transaction.find({user_id: user.user_id})
        return res.status(200).json({
            success: true,
            message: `Get all transactions current user succeeded`,
            transactions: transactions
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllTransaction,
    getTransactionById,
    getTransactionCurrentUser
}