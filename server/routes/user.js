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
        if(item){
            res.json(item)
        }else{
            res.status(404).json({error:'no user present in db'})
        }
    })
    .catch((err) => {
        throw err
    })
})

router.delete('/doDelete/:name', (req, res) => {
  if (req.params) {
    const name = req.params.name
    db.userModal.findOneAndDelete({
      name
    })
      .then((item) => {
         if(item){
             res.send(`${item.name} has been successfully deleted`)
         }else{
             res.status(404).json({error: `${name} not found`})
         }
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
