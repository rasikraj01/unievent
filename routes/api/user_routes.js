const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


// models import
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');

const router = express.Router();

// to register a new user
router.post('/register', (req, res) => {
   User.findOne({society_email: req.body.society_email}).then((result) => {
      if (!result){
         const new_User = new User({
            society_email : req.body.society_email,
            password: req.body.password,
            acc_type : req.body.acc_type
         })

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(new_User.password, salt, (err, hash) => {
               if (err) throw err;3
               new_User.password = hash;
               new_User.save().then((result) => {
                  res.json(result)
               }).catch((err) => {console.log(err)})
            })
         })
      } // if condition ends
      else{
         res.status(400).json({message : 'Email already exists'})
      }
   })
})

// to login a resgistered User
router.post('/login', (req, res) => {
   const society_email = req.body.society_email;
   const password = req.body.password;
   User.findOne({society_email}).then((result) => {
      if(!result){
         return res.status(404).json({message : 'email not found'})
      }
      bcrypt.compare(password, result.password).then((match) => {
         if(match){
               const payload = {
                  id : result.id,
                  society_email : result.society_email,
                  acc_type : result.acc_type
               } //jwt payload
               jwt.sign(payload, 'abcssss', { expiresIn: 3600}, (err, token) => {
                  res.cookie('jwt', `${token}`).json({success: true, token: 'Bearer ' + token });
               })
         }
         else{
            return res.status(400).json({message: 'incorrect password'})
         }
      })
   })
});


// to get the current user
router.get('/current', passport.authenticate('jwt', {session : false}),(req, res) => {
   //User.findOne({society_email : req.user.society_email}).then((result) => {console.log(result);})
   res.json(req.user);
});

router.get('/logout', passport.authenticate('jwt', {session : false}), (req, res) => {
   res.clearCookie('jwt').json({logout : true});
})

//to delete a user and all its Data
router.delete('/current', passport.authenticate('jwt', {session : false}), (req, res) => {
   let message = {};

   if(req.user.acc_type === 'organizer'){
      Event.remove({user : req.user.id}).then((result) => {
         if(result){
            message.events = 'all events deleted';
         }else{
            message.events = 'unable to delete events';
         }
      }).catch((err) => console.log(err))
   }

   Profile.findOneAndRemove({user: req.user.id}).then((result) => {
      if(result){
         message.profile = 'profile deleted';
      }
      else{
         message.profile = 'cant find profile';
      }
   })

   User.findOneAndRemove({society_email : req.user.society_email}).then((result) => {
      if(result){
         message.user = 'user deleted successfully';
         res.json(message)
      }
      else{
         message.user = 'user not found';
         res.json(message)
      }
   }).catch((err) => console.log(err))
})

module.exports = router;
