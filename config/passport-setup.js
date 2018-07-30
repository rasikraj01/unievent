const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user.js');

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
   token = req.cookies['jwt']

  return token;
};


const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'abcssss';

module.exports = (passport) => {
   passport.use(
      new JwtStrategy(opts, (payload, done) => {
         User.findById(payload.id).then((user) => {
            if(user)
               done(null, user);
            else
               done(null, false)
         }).catch((err) => {console.log(err);})
      })
   )
}
