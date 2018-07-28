if (!localStorage.getItem("token"))
   window.location.href = '/organizer/login';


axios({
   method:'get',
   url:'/api/user/current',
   headers : {Authorization : localStorage.getItem("token")}
}).then((value) => {
   if(value.status == 200){
      document.getElementById('title').innerHTML = `${value.data.name} | Dashboard`;
      document.getElementById('currentUser').innerHTML = `${value.data.name}`;
      localStorage.setItem('user', value.data._id)
   }else{
      window.location.href = '/organizer/login';
   }}).catch((value) => {
      window.location.href = '/organizer/login';
})

const title = document.getElementById('title');
const logoutButton = document.getElementById('logout');
const profile = document.getElementById('profile');
const createEvent = document.getElementById('createEvent');
const listEvents = document.getElementById('listEvents');
const content = document.getElementById('content');

let eventFormHTML = `<form id="eventForm">
   <input autofocus type="text" name="event_name" value="" placeholder="event_name" id="event_name"><br>
   <input name="host_college" placeholder="host_college" type="text" id="host_college"><br>
   <input name="venue" placeholder="venue" type="text" id="venue"><br>
   <input name="society" placeholder="society" type="text" id="society"><br>
   <input name="description" placeholder="description" type="text" id="description"><br>
   <input name="form_link" placeholder="form_link" type="text" id="form_link"><br>
   <input name="cover_link" placeholder="cover_link" type="text" id="cover_link"><br>
   <input name="number_of_participants" placeholder="number_of_participants" type="text" id="number_of_participants"><br>
   <input name="date" placeholder="date" type="date" id="date"><br>
   <input name="prizes_worth" placeholder="prizes_worth" type="text" id="prizes_worth"><br>

   <input type="submit" name="register" value="Create Event" id="newEventSubmit">
</form>`
let profileFormHTML = `<form id="profileForm">
                  <input autofocus type="text" name="username" value="" placeholder="username" id="username"><br>
                  <input name="mobile_number" placeholder="mobile_number" type="text" id="mobile_number" maxlength="10"><br>
                  <input name="college" placeholder="college" type="text" id="college"><br>
                  <input name="field_of_study" placeholder="field_of_study" type="text" id="field_of_study"><br>
                  <input name="year" placeholder="year" type="text" id="year" maxlength="1"><br>

                  <input type="submit" name="register" value="Update Profile" id="UpdateProfileSubmit">
               </form>`



let view ;

logoutButton.addEventListener('click', () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   window.location.href = '/organizer/login';
})

profile.addEventListener('click', () => {
   content.innerHTML = profileFormHTML;

   const username = document.getElementById('username');
   const mobile_number = document.getElementById('mobile_number');
   const  college = document.getElementById('college');
   const field_of_study = document.getElementById('field_of_study');
   const year = document.getElementById('year');
   const UpdateProfileSubmit = document.getElementById('UpdateProfileSubmit');
   axios({
      method:'get',
      url:'/api/profile/',
      headers : {Authorization : localStorage.getItem("token")}
   }).then((result) => {
      if(result.data.status === 404){
      }
      else{
         username.value = result.data.username;
         mobile_number.value = result.data.mobile_number;
         college.value = result.data.college;
         field_of_study.value = result.data.field_of_study;
         year.value = result.data.year;


         UpdateProfileSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let data = {
               username : username.value,
               mobile_number : mobile_number.value,
               college : college.value,
               field_of_study : field_of_study.value,
               year: year.value
            }
            axios({
               method:'post',
               url:'/api/profile/',
               data : data,
               headers : {Authorization : localStorage.getItem("token")}
            }).then((result) => {
                  UpdateProfileSubmit.style.background = 'green'
               })
               .catch(() => {console.log('err');})
         })
      }
   }).catch((result) => {
      console.log(result);
   })
})


createEvent.addEventListener('click', () => {
   content.innerHTML = eventFormHTML;

   const event_name = document.getElementById('event_name');
   const host_college = document.getElementById('host_college');
   const venue = document.getElementById('venue');
   const society = document.getElementById('society');
   const  description = document.getElementById('description');
   const form_link = document.getElementById('form_link');
   const cover_link = document.getElementById('cover_link');
   const number_of_participants = document.getElementById('number_of_participants');
   const date = document.getElementById('date');
   const prizes_worth = document.getElementById('prizes_worth');
   const newEventSubmit = document.getElementById('newEventSubmit');

   newEventSubmit.addEventListener('click', (e) => {

      e.preventDefault();

      let data = {
         event_name : event_name.value,
         host_college : host_college.value,
         venue : venue.value,
         society : society.value,
         description : description.value,
         form_link : form_link.value,
         cover_link: cover_link.value,
         number_of_participants: number_of_participants.value,
         date: date.value,
         prizes_worth: prizes_worth.value
      }
      let axiosConfig =  {headers : {'Authorization' : localStorage.getItem("token")}}

      axios.post('/api/event', data, axiosConfig).then((result) => {
            newEventSubmit.style.background = 'green'
            console.log('sent');
         })
         .catch(() => {console.log('err');})
   })
})


function editEvent(id) {
   axios.get(`/api/event/${id}`)
      .then((result) => {
         // add regex to date field
         let editFormHTML =
         `<form id="EditeventForm">
            <input autofocus type="text" name="event_name" value="${result.data.event_name}" placeholder="event_name" id="event_name"><br>
            <input name="host_college" placeholder="host_college" type="text" id="host_college" value="${result.data.host_college}"><br>
            <input name="venue" placeholder="venue" type="text" id="venue" value="${result.data.venue}"><br>
            <input name="society" placeholder="society" type="text" id="society" value="${result.data.society}"><br>
            <input name="description" placeholder="description" type="text" id="description" value="${result.data.description}"><br>
            <input name="form_link" placeholder="form_link" type="text" id="form_link" value="${result.data.form_link}"><br>
            <input name="cover_link" placeholder="cover_link" type="text" id="cover_link" value="${result.data.cover_link}"><br>
            <input name="number_of_participants" placeholder="number_of_participants" type="text" id="number_of_participants" value="${result.data.number_of_participants}"><br>
            <input name="date" placeholder="date" type="datetime" id="date" value="${result.data.date}"><br>
            <input name="prizes_worth" placeholder="prizes_worth" type="text" id="prizes_worth" value="${result.data.prizes_worth}"> <br>
            <input type="submit" name="edit event" value="Edit Event" id="editEventSubmit">
         </form>`

         content.innerHTML = editFormHTML;

         const event_name = document.getElementById('event_name');
         const host_college = document.getElementById('host_college');
         const venue = document.getElementById('venue');
         const society = document.getElementById('society');
         const  description = document.getElementById('description');
         const form_link = document.getElementById('form_link');
         const cover_link = document.getElementById('cover_link');
         const number_of_participants = document.getElementById('number_of_participants');
         const date = document.getElementById('date');
         const prizes_worth = document.getElementById('prizes_worth');
         const editEventSubmit = document.getElementById('editEventSubmit');

         editEventSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let data = {
               event_name : event_name.value,
               host_college : host_college.value,
               venue : venue.value,
               society : society.value,
               description : description.value,
               form_link : form_link.value,
               cover_link: cover_link.value,
               number_of_participants: number_of_participants.value,
               date: date.value,
               prizes_worth: prizes_worth.value
            }
            let axiosConfig =  {headers : {'Authorization' : localStorage.getItem("token")}}

            axios.put(`/api/event/${result.data._id}`, data, axiosConfig).then((result) => {
               editEventSubmit.style.background = 'green'
               console.log('Edit request Sent');
            }).catch((err) => {console.log('err' + err);})
         })
      })
      .catch((err) => {console.log('err' + err);})
}

function deleteEvent(id) {
   console.log(`Delete ${id}`);
}

listEvents.addEventListener('click', () => {
   let user = localStorage.getItem('user');
   let url = `/api/event/?user=${user}`;
   axios.get(url).then((result) => {
      let data = "";
      console.log(result.data);
      result.data.forEach((key) => {
         data +=
         `<li>
            <h3>${key.event_name}</h3>
            <h4>${key.host_college}</h4>
            <h4>${key.venue}</h4>
            <h4>${key.society}</h4>
            <h4>${key.description}</h4>
            <h4>${key.form_link}</h4>
            <h4>${key.cover_link}</h4>
            <h4>${key.number_of_participants}</h4>
            <h4>${key.date}</h4>
            <h4>${key.prizes_worth}</h4>
            <div class="action">
               <button id=${key._id} onclick="editEvent(this.id)" >EDIT</button>
               <button id=${key._id} onclick="deleteEvent(this.id)" >DELETE</button>
            </div>
         </li>`

         })
      content.innerHTML = data;



   }).catch((err) => {console.log('err ' + err);})
})
