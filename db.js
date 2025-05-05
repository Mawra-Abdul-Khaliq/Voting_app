const mongoose = require('mongoose')
require('dotenv').config()

const mongooURL = process.env.MONGOODB_URL_LOCAL

mongoose.connect(mongooURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

// Event listners
db.on('connected', ()=>{
    console.log('Conected to MongoDB server');
})
db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
})
db.on('disconnected', ()=>{
    console.log('Disconected to MongoDB server');
})

// Export database connection

module.exports = db;