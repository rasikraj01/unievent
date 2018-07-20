const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const User = require('../../models/user');


const router = express.Router();

// to register a new user
router.post('/register', (req, res) => {
   User.findOne({email: req.body.email}).then((result) => {
      if (!result){
         const new_User = new User({
            name: req.body.name,
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

// to login a resgistered User
router.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.password;
   User.findOne({email}).then((result) => {
      if(!result){
         return res.status(404).json({email : 'email not found'})
      }
      bcrypt.compare(password, result.password).then((match) => {
         if(match){
               const payload = {
                  id : result.id,
                  name : result.name,
                  email : result.email,
                  acc_type : result.acc_type
               } //jwt payload

               jwt.sign(payload, 'abcssss', { expiresIn: 3600}, (err, token) => {
                  res.json({success: true, token: 'Bearer ' + token });
               })
         }
         else{
            return res.status(400).json({password: 'incorrect password'})
         }
      })
   })
});


// to get the current user
router.get('/current', passport.authenticate('jwt', {session : false}),(req, res) => {
   //User.findOne({email : req.user.email}).then((rsul) => {console.log(rsul);})
   res.json(req.user);
});

//to logout a user
router.get('/logout', passport.authenticate('jwt', {session : false}), (req, res) => {
   res.json({message : 'destroy the token from header in frontend :P'})
})

//to delete a user
router.delete('/current', passport.authenticate('jwt', {session : false}), (req, res) => {

   User.findOneAndRemove({email : req.user.email}).then((result) => {
      if(result){
         res.json({message: 'User Deleted'})
      }
      else{
         res.json({message: 'user not found'})
      }
   })
   // destroy the jsonwebtoken ?
   // delete the user profile
})

module.exports = router;
