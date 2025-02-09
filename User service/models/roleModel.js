const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_id: {
        type: String,
        required: true,
        unique: true
    },
    role_name: {
        type: String,
        required: true
    }
})

const roleModel = mongoose.model('Role', roleSchema)

module.exports = roleModel