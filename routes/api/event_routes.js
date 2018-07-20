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
      if(result){
         res.status(200).json(result)
      }
      else {
         res.json({message : 'query does not match any Event'})
      }
   }).catch((err) => {console.log(err);})
})

router.get('/:id', (req, res) => {
   Event.findById({_id : req.params.id}).then((result) => {
      if(result){
         res.json(result)
      }
      else {
         res.status(404).json({message : 'Event not Found'})
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

})


router.delete('/:id', passport.authenticate('jwt', {session : true}) /*add authorization*/,(req, res) => {

})

module.exports = router;
