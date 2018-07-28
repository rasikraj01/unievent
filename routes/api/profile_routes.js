const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// models import
const User = require('../../models/user');
const Profile = require('../../models/profile');

const router = express.Router();

// get current user Profile
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   if(req.user){
      Profile.findOne({user : req.user.id}).then((result) => { //populate ?
         if(result){
            res.json(result)
         }
         else{
            res.json({message : 'user not found', status: 404})
         }
      }).catch((err) => {console.log(err); res.json({message : 'user not found'})})
   }
   else{
      res.json({message : 'not logged in'})
   }
})

//to check of username Exists
router.get('/username/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
   if (req.user) {
      Profile.findOne({username : req.params.username}).then((value) => {
         if(value){
            res.json({message : 'Username Taken. Please Select a different Username'})
         }else{
               res.json({message : 'Username Available'})
         }
   }).catch((err) => console.log(err))
   }
})

// create a profile for the current user
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   const profileF = {
         user : req.user.id,
         username : req.body.username,
         mobile_number : req.body.mobile_number,
         college : req.body.college,
         field_of_study : req.body.field_of_study,
         year : req.body.year
   }
   Profile.findOne({user : req.user.id}).then((result) => {
      if(result){
         Profile.findOneAndUpdate({user : req.user.id}, {$set : profileF}, {new: true }).then((updated_profile) => {
            res.json(updated_profile)
      }).catch((err) => {console.log(err)})
      }
      else{
         //check if mobile mobile_number is valid using 2FA ?
         Profile.findOne({username : profileF.username}).then((value) => {
            if(value){
               res.json({message : 'Username Taken. Please Select a different Username'})
            }else{
               const newProfile = new Profile(profileF);
               newProfile.save().then((result) => {res.json(result)}).catch((err) => console.log(err))
            }
         })
      }
   }).catch((err) => {console.log(err)})
})



//Edit a profile
router.patch('/', passport.authenticate('jwt', {session: false}), (req, res) => {
   if(req.user){
      const ProfileF = {
            mobile_number : req.body.mobile_number,
            college : req.body.college,
            field_of_study : req.body.field_of_study,
            year : req.body.year
      }
      Profile.findOne({user : req.user.id}).then((result) => {
         if(result){
            //update profile
            Profile.findOneAndUpdate({user : req.user.id}, {$set : ProfileF}, {new: true }).then((updated_profile) => {
                  res.json(updated_profile)
            }).catch((err) => {console.log(err)})
         }else{
            res.json({message: 'Profile Does not exist. Please create a Profile.'})
         }
      }).catch((err) => console.log(err))
   }
})

module.exports = router;
