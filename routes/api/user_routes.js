const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const User = require('../../models/user');


const router = express.Router();

// to get the current user
router.get('/current', (req, res) => {

});

// to register a new user
router.post('/register', (req, res) => {
   User.findOne({email: req.body.email}).then((result) => {
      if (!result){
         const new_User = new User({
            name: {
               first_name : req.body.name.first_name,
               last_name : req.body.name.last_name
            },
            email : req.body.email,
            password: req.body.password,
            acc_type : req.body.acc_type
         })

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(new_User.password, salt, (err, hash) => {
               if (err) throw err;
               new_User.password = hash;
               new_User.save().then((result) => {
                  res.json(result)
               }).catch((err) => {console.log(err)})
            })
         })
      } // if condition ends
      else{
         res.status(400).json({email : 'Email already exists'})
      }
   })
})

router.post('/login', (req, res) => {
   res.json({m :'login route'});
})
module.exports = router;
