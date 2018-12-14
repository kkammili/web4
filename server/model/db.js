const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/MongoosePM'

// user schema
const userSchema = new mongoose.Schema({
    name:String,
    email: {type:String, unique:true},
    createdOn: {type:Date, default:Date.now()},
    modifiedOn: Date,
    lastLogin: Date
})

// user modal
mongoose.model('User', userSchema)


// project schema
const projectSchema = new mongoose.Schema({
    projectName:String,
    createdOn:{type:Date, default: Date.now},
    modifiedOn: Date,
    createdBy: String,
    tasks: String
})

// Build the project model
mongoose.model('Project', projectSchema)




mongoose.connect(dbURI)

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to' + dbURI)
})

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error', + err)
})

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected')
})

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination')
        process.exit(0)
    })
})