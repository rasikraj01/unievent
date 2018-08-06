const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePasswordInput (data) {
    let errs = {}

    data.old_password = !isEmpty(data.old_password) ? data.old_password : '';
    data.new_password = !isEmpty(data.new_password) ? data.new_password : '';

    console.log(data);
    if(!Validator.isLength(data.new_password, {max:30, min:8})) errs.new_password = 'Password Must be Between 8 and 30 characters';
    if(Validator.isEmpty(data.new_password)) errs.new_password = 'New Password is req'
    if(Validator.isEmpty(data.old_password)) errs.old_password = 'Old Password is req'

   return {errs, isValid : isEmpty(errs)}
}
