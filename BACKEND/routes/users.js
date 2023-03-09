/*https://youtu.be/1cjdlfB11Ss
(see What Is Express JS? | Express JS Tutorial for Beginners 2022 | Express JS API | Simplilearn, 2022)
*/
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//The IIE. 2021. APDS7311 Lab Guide 2022 [APDS7311 Lab Guide]. The Independent Institute of Education: Unpublished.
//Here, The IIE (2021: 42) gives us code on how to create new users and use bcrypt to hash and salt their passwords.
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash
        })
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User registered',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
})

router.post('/login', (req, res) => {
    let fetchedUser
    User.findOne({username: req.body.username})
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: 'Failed to login'
            })
        }
        fetchedUser = user
        return bcrypt.compare(req.body.password, user.password) //Comparing bcrypt password with password typed to login
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Could not login'
            })
        }

        const token = jwt.sign({username: fetchedUser.username,
        userid: fetchedUser._id}, 'secret_this_should_be_longer_than_it_is',
        {expiresIn: '1h'})

        res.status(200).json({token: token})
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Authentication failure'
        })
    })
})

module.exports = router