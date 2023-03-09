const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Post  = require('./models/post')
const fs = require('fs')
const cert = fs.readFileSync('keys/certificate.pem')

const options = {
    server: {sslCA: cert}};
    
const connstring = 'mongodb+srv://lesediS:Password123@cluster0.3yivysw.mongodb.net/?retryWrites=true&w=majority'
//Mongo Atlas password: Password123
//const connstring = 'mongodb://localhost:27017'

const userRoute = require('./routes/users')
const postRoute  = require('./routes/posts')

mongoose.connect(connstring)
.then(() => {
    console.log('Connected to MongoDB')
}) .catch(() => {
    console.log('Not connected to MongoDB')
}, options)

app.use(express.json())

/*The IIE. 2021. APDS7311 Lab Guide 2022 [APDS7311 Lab Guide]. The Independent Institute of Education: Unpublished.
The code below gives the app permissions to not only create, post, and delete data, but also caters for CORS (The IIE, 2021: 44).
This will be more relevent in the frontend.
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

app.use(urlprefix + '/users', userRoute)
app.use(urlprefix + '/posts', postRoute)

module.exports = app