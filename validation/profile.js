const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
    let errs = {}

    data.society_name = !isEmpty(data.society_name) ? data.society_name : '';
    data.college = !isEmpty(data.college) ? data.college : '';
    data.president_name = !isEmpty(data.president_name) ? data.president_name : '';
    data.mobile_number = !isEmpty(data.mobile_number) ? data.mobile_number : '';

    console.log(data.mobile_number);


   if(!Validator.isMobilePhone(data.mobile_number, ['en-IN']))  errs.mobile_number = `Please Enter A valid Contact No.`
   if(!Validator.isLength(data.college, {max:120}))  errs.college = 'College Name cannot be More than 120 characters.'
   if(!Validator.isLength(data.society_name, {max:120}))  errs.society_name = 'Society Name cannot be More than 120 characters.'
   if(!Validator.isLength(data.president_name, {max:120}))  errs.president_name = 'President Name cannot be More than 120 characters.'

   if(Validator.isEmpty(data.society_name))  errs.society_name = 'Society Name is required'
   if(Validator.isEmpty(data.college))  errs.college = 'College Name is required'
   if(Validator.isEmpty(data.president_name))  errs.president_name = `President's Name is required`
   if(Validator.isEmpty(data.mobile_number))  errs.mobile_number = `President's Contact No. is required`

   return {errs, isValid : isEmpty(errs)}
}
