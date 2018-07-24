const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// models import
const User = require('../../models/user');
const Profile = require('../../models/profile');

const router = express.Router();

// get current user
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   if(req.user){
      Profile.findOne({user : req.user.id}).then((result) => { //populate ?
         if(result){
            res.json(result)
         }
         else{
            res.json({message : 'user not found'})
         }
      }).catch((err) => {console.log(err)})
   }
   else{
      res.json({message : 'not logged in'})
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
   }// TODO : make sure username is unique
   Profile.findOne({user : req.user.id}).then((result) => {
      if(result){
         //update a profile
         Profile.findOneAndUpdate({user : req.user.id}, {$set : profileF}, {new: true }).then((result) => {
               res.json(result)
         }).catch((err) => {console.log(err)})
      }
      else{
         //check if username exsists if it doesnot then only save profile
         const newProfile = new Profile(profileF);
         newProfile.save().then((result) => {res.json(result)}).catch((err) => console.log(err))
      }
   }).catch((err) => {console.log(err)})
})

module.exports = router;
