const express = require('express')
const db = require('./db')
const app = express()
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')

const bodyParser = require('body-parser')
app.use(bodyParser.json())  // we use app.use for middleware

app.use('/user', userRoutes)
app.use('/candidate', candidateRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Listening on Port 3000")
})