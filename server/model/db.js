const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbURI = 'mongodb://localhost/MongoosePM'

mongoose.connect(dbURI, {useCreateIndex: true, useNewUrlParser: true})

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI)
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error', +err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination')
    process.exit(0)
  })
})

// project schema
const projectSchema = new mongoose.Schema({
  projectName: String,
  createdOn: {type: Date, default: Date.now},
  modifiedOn: Date,
  createdBy: String,
  tasks: String
})

// Build the project model
const projectModal = mongoose.model('Project', projectSchema)

// user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  createdOn: {type: Date, default: Date.now()},
  modifiedOn: Date,
  lastLogin: Date
})

// user modal
const userModal = mongoose.model('User', userSchema)

module.exports = {
  userModal,
  projectModal
}
