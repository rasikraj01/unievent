const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
   res.render('login');
})

router.get('/register', (req, res) => {
   res.render('register');
})

router.get('/dashboard', passport.authenticate('jwt', {session : false}),(req, res) => {
   res.render('dashboard');
})

module.exports = router;
