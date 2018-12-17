const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/MongoosePM'

mongoose.connect(dbURI)

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to' + dbURI)
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
mongoose.model('Project', projectSchema)

// user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  createdOn: {type: Date, default: Date.now()},
  modifiedOn: Date,
  lastLogin: Date
})

// user modal
const User = mongoose.model('User', userSchema)

module.exports = {
  createUser: (name, email) => {
    new User({
      name,
      email
    }).save((err, res) => {
      if (err) {
      } else {
      }
    })
  },
    getUser: ()=>{
        User.find({}, (err, res) => {
            if (err) {
                console.log(err, "<--- error occoured while reading use")
            } else {
                console.log(res, '<--- res in db')
                return res
            }
        })
    }
}
