const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user')


mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser:true})
mongoose.connection.on('connected', ()=>{
    console.log('connected to mongod at mongodb://localhost:27017/')
})
mongoose.connection.on('error', ()=>{
    console.log('UnExpected error while connecting to mongodb')
})

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res)=>{
    res.send(
        '<pre>check the pre tag</pre>'
    )
})

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app