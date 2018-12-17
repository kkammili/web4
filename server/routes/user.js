const express = require('express')
const router = express.Router()
const db = require('../model/db')

router.post('/doCreate/:name/:email', (req, res)=>{
    const {name, email} = req.params
    if(name && email){
        new db.userModal({
            name,
            email,
            createdOn:Date.now(),
            modifiedOn:Date.now(),
            lastLogin:Date.now()
        }).save()
            .then((item) =>{
                return res.status(200).json(item)
            })
            .catch(err => console.log(err, '<--- err saving data to db'))
    }
});        // Create new user action


router.get('/doRead', (req, res)=>{
    db.userModal.find({})
        .then((item)=>{
            res.json(item)
        })
        .catch((err)=>{
            console.log(err, '<--- error pulling data from database')
        })
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