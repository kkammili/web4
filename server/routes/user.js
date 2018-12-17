const express = require('express')
const router = express.Router()
const db = require('../model/db')

router.post('/doCreate/:name/:email', (req, res) => {
  const {name, email} = req.params
  if (name && email) {
    new db.userModal({
      name,
      email,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      lastLogin: Date.now()
    }).save()
      .then((item) => {
        return res.status(200).json(item)
      })
      .catch(err => {
          throw err
      })
  }
}) // Create new user action

router.get('/doRead', (req, res) => {
  db.userModal.find({})
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
        throw err
    })
})

router.delete('/doDelete/:name', (req, res) => {
  if (req.params) {
    const name = req.params.name
    db.userModal.deleteOne({
      name
    })
      .then((item) => {
        res.send(`${item} ${name} has been successfully deleted`)
      })
      .catch((err) => {
          throw err
      })
  }
})

// user action
// Login form
// Login action
// Logout current user

module.exports = router
