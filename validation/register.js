const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
    let errs = {}

    data.society_email = !isEmpty(data.society_email) ? data.society_email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    console.log(data.society_email);
    if(!Validator.isEmail(data.society_email)) {
      errs.society_email = 'Please Enter A Valid Email'
      }
   if(Validator.isEmpty(data.society_email)) {
         errs.society_email = 'email is req'
      }
     if(!Validator.isLength(data.password, {max:30, min:8})){
        errs.password = 'Password Must be Between 8 and 30 characters';
     }

     if(Validator.isEmpty(data.password)) {
          errs.password = 'password is req'
       }
   return {errs, isValid : isEmpty(errs)}
}
