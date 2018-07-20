const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.js');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'abcssss';

module.exports = (passport) => {
   passport.use(
      new JwtStrategy(opts, (payload, done) => {
         User.findById(payload.id).then((user) => {
            if(user){
               done(null, user);
            }
            else{
               done(null, false)
            }
         }).catch((err) => {console.log(err);})
      })
   )
}
