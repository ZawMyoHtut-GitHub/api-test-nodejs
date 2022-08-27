// require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://zmh:testing321321@testing.jdw0o6s.mongodb.net/test",{useNewUrlParser:true})

const db = mongoose.connection

db.on('error',error=>console.log(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

const subscriberRouter = require('./routes/subscribers')
app.use('/api',subscriberRouter)



app.listen(5000,()=>{
    console.log("host 5000")
})