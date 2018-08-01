const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// models import
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');

//middleware
const acc_type_authorization = require('../../middleware/acc_type.middleware');

const validateEventInput = require('../../validation/event');

const router = express.Router();

// get all events or filtered events
router.get('/', (req, res) => {
   if(req.query.user)
      req.query.user =  mongoose.Types.ObjectId(req.query.user)
   Event.find(req.query).then((result) => {
      if(result.length === 0){
         res.json({message : 'query does not match any Event'})
      }
      else {
         res.status(200).json(result)
      }
   }).catch((err) => {console.log(err)})
})


//get a unique event with id
router.get('/:id', (req, res) => {
   Event.findById({_id : req.params.id}).then((result) => {
      if(result === null){
         res.status(404).json({message : 'Event not Found'})
      }
      else {
         res.json(result)
      }
   }).catch((err) => {console.log(err)})
})


//post an event
router.post('/', passport.authenticate('jwt', {session : true}) , acc_type_authorization ,(req, res) => {

   const {errs, isValid} = validateEventInput(req.body);

   if(!isValid){ // check validation // if errs is true
      errs._id = null;
      res.json(errs)
   }
   else{
      if(req.user){
         const newEvent = new Event({
            user: req.user.id,
            event_name : req.body.event_name,
            host_college : req.body.host_college,
            venue : req.body.venue,
            description : req.body.description,
            society : req.body.society,
            form_link : req.body.form_link,
            cover_photo : {
               name: req.body.cover_photo.name,
               link: req.body.cover_photo.link
            },
            number_of_participants : {
               max: req.body.number_of_participants.max,
               min: req.body.number_of_participants.min
            },
            date : req.body.date,
            prize_description : req.body.prize_description,
            tags: req.body.tags,
            event_incharge : {
               name : req.body.event_incharge.name,
               mobile_number: req.body.event_incharge.mobile_number
            }
         })
         newEvent.save().then((result) => {
            res.json(result)
         }).catch((err) => {console.log(err);
            res.json({message: 'unable to Create Event', _id: null})})
      }
      else {
         res.json({message: 'restricted', _id: null})
      }
   }
})

// edit an event
router.put('/:id', passport.authenticate('jwt', {session : true}) , acc_type_authorization ,(req, res) => {

   const {errs, isValid} = validateEventInput(req.body);

   if(!isValid){ // check validation // if errs is true
      errs._id = null;
      res.json(errs)
   }
   else{
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
                     cover_photo : {
                        name: req.body.cover_photo.name,
                        link: req.body.cover_photo.link
                     },
                     number_of_participants : {
                        max: req.body.number_of_participants.max,
                        min: req.body.number_of_participants.min
                     },
                     date : req.body.date,
                     prize_description : req.body.prize_description,
                     tags: req.body.tags,
                     event_incharge : {
                        name : req.body.event_incharge.name,
                        mobile_number: req.body.event_incharge.mobile_number
                     }
                  }
                   Event.findByIdAndUpdate({_id : req.params.id}, updatedEvent).then(() => {
                      Event.findOne({_id : req.params.id}).then((result) => {
                         res.json(result)
                      }).catch((err) => {console.log(err)})
                   }).catch((err) => {console.log(err)})
               }
               else {
                  res.json({message: 'You are not authorized to Update this Event'})
               }
            }).catch((err) => {console.log(err)})
      }
      else {
         res.json({message: 'invalid update request'})
      }
   }
})


// delete an event
router.delete('/:id', passport.authenticate('jwt', {session : true}) ,acc_type_authorization ,(req, res) => {
   if(req.params.id){
         // add record not found condition ps invalid id
         Event.findById({_id : req.params.id}).then((result) => {
            if(result.user == req.user.id){
               Event.findOneAndDelete({_id : req.params.id}).then(() => {
                  res.status(200).json({message : "your event is deleted"})
               }).catch((err) => {console.log(err);})
            }
            else {
               res.json({message: 'You are not authorized to Delete this Event'})
            }
         }).catch((err) => {console.log(err)})
   }
   else {
      res.json({message: 'invalid delete request'})
   }
})

module.exports = router;
