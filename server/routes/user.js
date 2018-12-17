const express = require('express')
const router = express.Router()
const db = require('../model/db')

router.post('/doCreate/:name/:email', (req, res)=>{
    const {name, email} = req.params
    db.createUser(name, email)
});        // Create new user action
// router.get('/user/edit', user.edit);      // Edit current user form


router.get('/doRead', (req, res)=>{
    console.log(res.send(db.getUser()))
    return res.json(db.getUser())
});


// router.get('/user/delete', user.confirmDelete); // delete current
// //user form
// router.post('/user/delete', user.doDelete);     // Delete current
// router.get('/login', user.login);
// router.post('/login', user.doLogin);
// router.get('/logout', user.doLogout);


//user action
// Login form
// Login action
// Logout current user

module.exports = router
