const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
    let errs = {}

    data.society_name = !isEmpty(data.society_name) ? data.society_name : '';
    data.college = !isEmpty(data.college) ? data.college : '';
    data.president_name = !isEmpty(data.president_name) ? data.president_name : '';
    data.mobile_number = !isEmpty(data.mobile_number) ? data.mobile_number : '';

    console.log(data.society_email);

   (Validator.isEmpty(data.society_name)) ? errs.society_name = 'Society Name is required';
   (Validator.isEmpty(data.college)) ? errs.college = 'College Name is required';
   (Validator.isEmpty(data.president_name)) ? errs.president_name = `President's Name is required`;
   (Validator.isEmpty(data.mobile_number)) ? errs.mobile_number = `President's Contact No. is required`;

   return {errs, isValid : isEmpty(errs)}
}
