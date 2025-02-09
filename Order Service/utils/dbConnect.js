require('dotenv').config()
const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URI_POSTFIX}/${process.env.MONGODB_DATABASE_NAME}`
mongoose.connect(uri)

var conn = mongoose.connection

conn.on('connected', () => {
    console.log('database is connected successfully')
})
conn.on('disconnected',() => {
    console.log('database is disconnected successfully')
})
conn.on('error', () =>{
    console.error.bind(console, 'connection error:')
})

module.exports = conn