export let changePasswordForm = `
<h3>Change Password</h3>
<form id="changePasswordForm">
   <input name="old_password" placeholder="old_password" type="password" id="old_password"><br>
   <input name="new_password" placeholder="new_password" type="password" id="new_password"><br>
   <input name="confirm_password" placeholder="confirm_password" type="password" id="confirm_password"><br>
   <input type="submit" name="register" value="Change Password" id="changePasswordFormSubmit" class="file-submit">
</form>`;

export let eventFormHTML = `
<h3 >Create Form</h3>
   <form id="eventForm">
      <input autofocus type="text" name="event_name" value="" placeholder="event_name" id="event_name"><br>
      <input name="host_college" placeholder="host_college" type="text" id="host_college"><br>
      <input name="venue" placeholder="venue" type="text" id="venue"><br>
      <textarea name="description" placeholder="description"  rows="8" cols="80" id="description"></textarea><br>
      <input name="society" placeholder="society" type="text" id="society"><br>
      <input name="form_link" placeholder="form_link" type="text" id="form_link"><br>
      Upload Cover Photo : <img class="cover-pic" src="" height="100"><input type="file" id="file-select" accept="image/jpeg, image/jpg" id="cover_link"/><br>
      <input name="min_number_of_participants" placeholder="min_number_of_participants" type="text" id="min_number_of_participants"><br>
      <input name="max_number_of_participants" placeholder="max_number_of_participants" type="text" id="max_number_of_participants"><br>
      <input name="date" placeholder="date" type="date" id="date"><br>
      <input name="prize_description" placeholder="prize_description" type="text" id="prize_description"><br>
      <input type="text" name="tags" placeholder="add tags on lowercase seprated by comma" id="tags"><br>
      <input name="event_incharge" placeholder="Event Incharge Name" type="text" id="event_incharge"><br>
      <input type="text" id="mobile_number" name="mobile_number" value="" placeholder="Event Incharge Mobile Number" maxlength="10">

      <progress value="0" max="100" id="progressBar"></progress>
      <input type="submit" name="register" value="Create Event" id="newEventSubmit" class="file-submit">
</form>`;
export let profileFormHTML = `
<h3 class="profileHead">Your Profile</h3>
<form id="profileForm">
   <input autofocus type="text" name="society_name" value="" placeholder="society_name" id="society_name"><br>
   <input name="college" placeholder="college" type="text" id="college"><br>
   <input name="president_name" placeholder="president_name" type="text" id="president_name"><br>
   <input name="p_mobile_number" placeholder="mobile_number" type="text" id="p_mobile_number" maxlength="10"><br>
<input type="submit" id="submit" value="Update Profile"/>
</form>`;
