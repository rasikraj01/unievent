const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// models import
const User = require('../../models/user');
const Profile = require('../../models/profile');

const router = express.Router();

const validateProfileInput = require('../../validation/profile');

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

// create a profile for the current user
router.post('/', passport.authenticate('jwt', {session:false, failureRedirect:'/organizer/login'}), (req, res) => {
   const {errs, isValid} = validateProfileInput(req.body);

   if(!isValid){ // check validation // if errs is true
      errs._id = null;
      res.json(errs)
   }
   else{
      const profileF = {
            user : req.user.id,
            society_name : req.body.society_name,
            college : req.body.college,
            president_name : req.body.president_name,
            mobile_number : req.body.mobile_number
      }
      Profile.findOne({user : req.user.id}).then((result) => {
         if(result){
            Profile.findOneAndUpdate({user : req.user.id}, {$set : profileF}, {new: true })
            .then((updated_profile) => res.json(updated_profile))
            .catch((err) => console.log(err))
         }
         else{
            const newProfile = new Profile(profileF);
            newProfile.save()
               .then((result) => res.json(result))
               .catch((err) => console.log(err))
            }
         }).catch((err) => console.log(err))
   }
})



//Edit a profile
router.patch('/', passport.authenticate('jwt', {session: false, failureRedirect:'/organizer/login'}), (req, res) => {
   const {errs, isValid} = validateProfileInput(req.body);

   if(!isValid){ // check validation // if errs is true
      errs._id = null;
      res.json(errs)
   }
   else{
      if(req.user){
         const ProfileF = {
               society_name : req.body.society_name,
               college : req.body.college,
               president_name : req.body.president_name,
               mobile_number : req.body.mobile_number,
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
      }else{
         console.log('cant find user');
      }
   }
})

module.exports = router;
