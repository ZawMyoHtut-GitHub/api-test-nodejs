// require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://zmh:testing321321@testing.jdw0o6s.mongodb.net/",{useNewUrlParser:true})
                //  "mongodb+srv://zmh:testing321321@testing.jdw0o6s.mongodb.net/test"
const db = mongoose.connection
const port = process.env.PORT || 5000

db.on('error',error=>console.log(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-    With,content-type,Accept,content-type,application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,     PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const subscriberRouter = require('./routes/subscribers')
app.use('/api',subscriberRouter)



app.listen(port,()=>{
    console.log("host 5000")
})