const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// models import
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');

const router = express.Router();

router.get('/', (req, res) => {
   Event.find(req.query).then((result) => {
      if(result.length === 0){
         res.json({message : 'query does not match any Event'})
      }
      else {
         res.status(200).json(result)
      }
   }).catch((err) => {console.log(err);})
})

router.get('/:id', (req, res) => {
   Event.findById({_id : req.params.id}).then((result) => {
      if(result.length === 0){
         res.status(404).json({message : 'Event not Found'})
      }
      else {
         res.json(result)
      }
   }).catch((err) => {console.log(err)})
})

router.post('/', passport.authenticate('jwt', {session : true}) /*add authorization*/ ,(req, res) => {
   if(req.user){
      const newEvent = new Event({
         user: req.user.id,
         event_name : req.body.event_name,
         host_college : req.body.host_college,
         venue : req.body.venue,
         description : req.body.description,
         society : req.body.society,
         form_link : req.body.form_link,
         cover_link : req.body.cover_link,
         number_of_participants : req.body.number_of_participants,
         date : req.body.date,
         prizes_worth : req.body.prizes_worth,
      })
      newEvent.save().then((result) => {
         res.json(result)
      }).catch((err) => {console.log(err)})
   }
   else {
      res.json({message: 'restricted'})
   }
})


router.put('/:id', passport.authenticate('jwt', {session : true}) /*add authorization*/,(req, res) => {
   if(req.params.id){
         // add record not found condition ps invalid id
         Event.findById({_id : req.params.id}).then((result) => {
            if(result.user == req.user.id){
               const updatedEvent = {
                  user: req.user.id,
                  event_name : req.body.event_name,
                  host_college : req.body.host_college,
                  venue : req.body.venue,
                  description : req.body.description,
                  society : req.body.society,
                  form_link : req.body.form_link,
                  cover_link : req.body.cover_link,
                  number_of_participants : req.body.number_of_participants,
                  date : req.body.date,
                  prizes_worth : req.body.prizes_worth,
               }
                Event.findByIdAndUpdate({_id : req.params.id}, updatedEvent).then((result) => {
                   res.json(result)
                }).catch((err) => {console.log(err);})
            }
            else {
               res.json({message: 'You are not authorized to Update this Event'})
            }
         }).catch((err) => {console.log(err);})
   }
   else {
      res.json({message: 'invalid update request'})
   }
})


router.delete('/:id', passport.authenticate('jwt', {session : true}) /*add authorization*/,(req, res) => {
   if(req.params.id){
         // add record not found condition ps invalid id
         Event.findById({_id : req.params.id}).then((result) => {
            if(result.user == req.user.id){
               Event.findOneAndDelete({_id : req.params.id}).then((deleted_event) => {
                  res.status(200).json(deleted_event)
               }).catch((err) => {console.log(err);})
            }
            else {
               res.json({message: 'You are not authorized to Delete this Event'})
            }
         }).catch((err) => {console.log(err);})
   }
   else {
      res.json({message: 'invalid delete request'})
   }
})

module.exports = router;
