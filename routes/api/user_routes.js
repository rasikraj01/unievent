const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


// models import
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');

const validateRegisterInput = require('../../validation/register');
const validatechangePasswordInput = require('../../validation/password');

const router = express.Router();

// to register a new user
router.post('/register', (req, res) => {
      const {errs, isValid} = validateRegisterInput(req.body);

      if(!isValid){ // check validation // if errs is true
         errs._id = null;
         res.json(errs)
      }
      else{
            User.findOne({society_email: req.body.society_email}).then((result) => {
               if (!result){
                  const new_User = new User({
                     society_email : req.body.society_email,
                     password: req.body.password,
                     acc_type : req.body.acc_type
                  })

                  bcrypt.genSalt(10, (err, salt) => {
                     bcrypt.hash(new_User.password, salt, (err, hash) => {
                        if (err) throw err;
                        new_User.password = hash;
                        new_User.save().then((result) => {

                           console.log(result);
                           res.json(result)
                        }).catch((err) => {console.log(err)})
                     })
                  })
               } // if condition ends
               else{
                  res.json({message : 'Email already exists'})
               }
            })
         }
})

// to login a resgistered User
router.post('/login', (req, res) => {

   const {errs, isValid} = validateRegisterInput(req.body);
      if(!isValid){ // check validation // if errs is true
         errs.success = false;
         res.json(errs)
      }
      else{
         const society_email = req.body.society_email;
         const password = req.body.password;
         User.findOne({society_email}).then((result) => {
            if(!result){
               return res.json({message : 'email not found', success: false})
            }
            bcrypt.compare(password, result.password).then((match) => {
               if(match){
                     const payload = {
                        id : result.id,
                        society_email : result.society_email,
                        acc_type : result.acc_type
                     } //jwt payload
                     jwt.sign(payload, 'abcssss', { expiresIn: 36000}, (err, token) => {
                        res.cookie('jwt', `${token}`).json({success: true, token: 'Bearer ' + token });
                     })
               }
               else{
                  return res.json({message: 'incorrect password', success: false})
               }
            })
         })
   }
});


router.post('/changePassword', passport.authenticate('jwt', {session : false}), (req, res) => {
   const {errs, isValid} = validatechangePasswordInput(req.body);

   if(!isValid){ // check validation // if errs is true
      errs._id = null;
      res.json(errs)
   }
   else{
      const old_password = req.body.old_password;
      const new_password = req.body.new_password;

      User.findById(req.user.id).then((user_match) => {
         if(user_match){
            bcrypt.compare(old_password, user_match.password).then((match) => {
               if(match){
                  bcrypt.genSalt(10, (err, salt) => {
                     bcrypt.hash(new_password, salt, (err, hash) => {
                        if (err) throw err;
                        User.update({_id: req.user.id}, {$set : {password : hash}}).then((result) => {
                           result._id = true;
                           res.json(result);
                        }).catch((err) => {console.log(err); res.json({message : 'Unable to change Password', _id : null})})
                     })
                  })
               }
               else{
                  res.json({_id : null , message : 'Old and New Passwords Do not Match'})
               }
            })
         }
         else{
            res.json({_id : null , message : 'User Not Found'});
         }
      }).catch((err) => {console.log(err); res.json({_id : null , message : 'User Not Found'})})
   }
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
