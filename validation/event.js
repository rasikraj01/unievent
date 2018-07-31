const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
    let errs = {}

    data.event_name = !isEmpty(data.event_name) ? data.event_name : '';
    data.host_college = !isEmpty(data.host_college) ? data.host_college : '';
    data.venue = !isEmpty(data.venue) ? data.venue : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.society = !isEmpty(data.society) ? data.society : '';
    data.form_link = !isEmpty(data.form_link) ? data.form_link : '';
    data.cover_photo.link = !isEmpty(data.cover_photo.link) ? data.cover_photo.link : '';
    data.cover_photo.name = !isEmpty(data.cover_photo.name) ? data.cover_photo.name : '';
    data.number_of_participants = !isEmpty(data.number_of_participants) ? data.number_of_participants : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.prize_description = !isEmpty(data.prize_description) ? data.prize_description : '';
    data.tags[0] = !isEmpty(data.tags[0]) ? data.tags[0] : '';
    data.event_incharge.name = !isEmpty(data.event_incharge.name) ? data.event_incharge.name : '';
    data.event_incharge.mobile_number = !isEmpty(data.event_incharge.mobile_number) ? data.event_incharge.mobile_number : '';

    console.log(data);
    (!Validator.isURL(data.form_link)) ? errs.form_link = 'Please Enter a Valid Form Link';
   //required
   (Validator.isEmpty(data.event_name)) ? errs.event_name = 'Event Name is required';
   (Validator.isEmpty(data.host_college)) ? errs.host_college = 'Host College is required';
   (Validator.isEmpty(data.venue)) ? errs.venue = 'Venue is required';
   (Validator.isEmpty(data.description)) ? errs.description = 'Description is required';
   (Validator.isEmpty(data.society)) ? errs.society = 'Society Name is required';
   (Validator.isEmpty(data.form_link)) ? errs.form_link = 'Form Link is required';
   (Validator.isEmpty(data.cover_photo.link)) ? errs.cover_photo.link = 'Cover Photo is required';
   (Validator.isEmpty(data.cover_photo.name)) ? errs.cover_photo.name = 'Cover Photo is required';
   (Validator.isEmpty(data.number_of_participants)) ? errs.number_of_participants = 'Please Enter the No. of Participants is required';
   (Validator.isEmpty(data.date)) ? errs.date = 'Event Date is required';
   (Validator.isEmpty(data.prize_description)) ? errs.prize_description = 'Prize Description is required';
   (Validator.isEmpty(data.tags)) ? errs.tags = 'Event Name is required';
   (Validator.isEmpty(data.event_incharge.name)) ? errs.event_incharge.name = 'Event Incharge Name is required';
   (Validator.isEmpty(data.event_incharge.mobile_number)) ? errs.event_incharge.mobile_number = `Event Incharge's Contact No. is required`;
'

   return {errs, isValid : isEmpty(errs)}
}
