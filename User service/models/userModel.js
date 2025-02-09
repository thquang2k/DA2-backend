const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique:true
    },
    user_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    phone_num: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ""
    },
    role_id : {
        type: String,
        default: "10"
    }
},
{
    timestamps: true,
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel