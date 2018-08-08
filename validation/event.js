const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEventInput (data) {
    let errs = {}

    data.event_name = !isEmpty(data.event_name) ? data.event_name : '';
    data.host_college = !isEmpty(data.host_college) ? data.host_college : '';
    data.venue = !isEmpty(data.venue) ? data.venue : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.society = !isEmpty(data.society) ? data.society : '';
    data.form_link = !isEmpty(data.form_link) ? data.form_link : '';
    data.cover_photo.link = !isEmpty(data.cover_photo.link) ? data.cover_photo.link : '';
    data.cover_photo.name = !isEmpty(data.cover_photo.name) ? data.cover_photo.name : '';
    data.number_of_participants.min = !isEmpty(data.number_of_participants.min) ? data.number_of_participants.min : '';
    data.number_of_participants.max = !isEmpty(data.number_of_participants.max) ? data.number_of_participants.max : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.prize_description = !isEmpty(data.prize_description) ? data.prize_description : '';
    data.tags[0] = !isEmpty(data.tags[0]) ? data.tags[0] : '';
    data.event_incharge.name = !isEmpty(data.event_incharge.name) ? data.event_incharge.name : '';
    data.event_incharge.mobile_number = !isEmpty(data.event_incharge.mobile_number) ? data.event_incharge.mobile_number : '';

   console.log(Validator.isNumeric(data.number_of_participants.min));
   console.log(data);
   if(!Validator.isURL(data.form_link)) errs.form_link = 'Please Enter a Valid Form Link';
   if(!Validator.isLength(data.host_college, {max:120})) errs.host_college = 'College Name cannot be More than 120 characters.'
   if(!Validator.isLength(data.description, {max:1500})) errs.description = 'Description cannot be More than 1500 characters.'
   if(!Validator.isLength(data.society, {max:120})) errs.society = 'Society Name cannot be More than 120 characters.'
   if(!Validator.isLength(data.venue, {max:120})) errs.venue = 'Venue cannot be More than 120 characters.'
   if(Validator.isNumeric(data.number_of_participants.min) && Validator.isNumeric(data.number_of_participants.max)){
      if(parseInt(data.number_of_participants.min) > parseInt(data.number_of_participants.max)){
               errs.number_of_participants_min = 'Min cannot be more than max';
            }
   }
   console.log(errs);
   if(!Validator.isNumeric(data.number_of_participants.min.toString()))  errs.number_of_participants_min = 'Invalid Number';
   if(!Validator.isNumeric(data.number_of_participants.max))  errs.number_of_participants_max = 'Invalid Number';
   if(!Validator.isLength(data.prize_description, {max: '240'}))  errs.prize_description = 'Prize Description cannot be More than 240 characters.';
   if(!Validator.isLength(data.event_incharge.name, {max: '120'}))   errs.event_incharge_name = 'Name cannot be More than 120 characters.';
   if(!Validator.isMobilePhone(data.event_incharge.mobile_number.toString(), ['en-IN']))  errs.event_incharge_name = 'mob no';
   if(parseInt(data.number_of_participants.min) <= 0) errs.number_of_participants_min = 'Minimun number of participants has to be more than 0';
   //required
   if(Validator.isEmpty(data.event_name)) errs.event_name = 'Event Name is required';
   if(Validator.isEmpty(data.host_college))  errs.host_college = 'Host College is required';
   if(Validator.isEmpty(data.venue))   errs.venue = 'Venue is required';
   if(Validator.isEmpty(data.description))   errs.description = 'Description is required';
   if(Validator.isEmpty(data.society)) errs.society = 'Society Name is required';
   if(Validator.isEmpty(data.form_link))  errs.form_link = 'Form Link is required';
   if(Validator.isEmpty(data.cover_photo.link)) errs.cover_photo_link = 'Cover Photo is required';
   if(Validator.isEmpty(data.cover_photo.name)) errs.cover_photo_name = 'Cover Photo is required';
   if(Validator.isEmpty(data.number_of_participants.min))   errs.number_of_participants_min = 'Please Enter A min. No. of Participants';
   if(Validator.isEmpty(data.number_of_participants.max))   errs.number_of_participants_max = 'Please Enter A max. No. of Participants';
   if(Validator.isEmpty(data.date)) errs.date = 'Event Date is required';
   if(Validator.isEmpty(data.prize_description)) errs.prize_description = 'Prize Description is required';
   if(Validator.isEmpty(data.tags[0])) errs.tags = 'Add atleast One Tag';
   if(Validator.isEmpty(data.event_incharge.name)) errs.event_incharge_name = 'Event Incharge Name is required';
   if(Validator.isEmpty(data.event_incharge.mobile_number)) errs.event_incharge_mobile_number = `Event Incharge's Contact No. is required`;

   return {errs, isValid : isEmpty(errs)}
}
