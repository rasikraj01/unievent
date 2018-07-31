axios({
   method:'get',
   url:'/api/user/current',
}).then((value) => {
      if(value.status == 200){
         localStorage.setItem('user', value.data._id)
         axios({
            method: 'get',
            url: '/api/profile/'
         }).then((result) => {
               if(result.data.society_name != undefined){
                  $('#title').html(`${result.data.society_name} | Dashboard`);
                  $('#currentUser').html( `${result.data.society_name}`);
               }else{
                  $('.welcome').html('Please add a Profile');
               }
            })
      }
   })

const title = document.getElementById('title');
const logoutButton = document.getElementById('logout');
const profile = document.getElementById('profile');
const createEvent = document.getElementById('createEvent');
const listEvents = document.getElementById('listEvents');
const currentUser = document.getElementById('currentUser');
const content = document.getElementById('content');

currentUser.addEventListener('click', () => {
   content.innerHTML = '<h2 class="welcome">Welcome to Your DashBoard ! </h2>'
})

let eventFormHTML = `
   <h3 >Create Form</h3>
      <form id="eventForm">
         <input autofocus type="text" name="event_name" value="" placeholder="event_name" id="event_name"><br>
         <input name="host_college" placeholder="host_college" type="text" id="host_college"><br>
         <input name="venue" placeholder="venue" type="text" id="venue"><br>
         <input name="description" placeholder="description" type="text" id="description"><br>
         <input name="society" placeholder="society" type="text" id="society"><br>
         <input name="form_link" placeholder="form_link" type="text" id="form_link"><br>
         Upload Cover Photo : <input type="file" id="file-select" accept="image/jpeg, image/jpg" id="cover_link"/><br>
         <input name="number_of_participants" placeholder="number_of_participants" type="text" id="number_of_participants"><br>
         <input name="date" placeholder="date" type="date" id="date"><br>
         <input name="prize_description" placeholder="prize_description" type="text" id="prize_description"><br>
         <input type="text" name="tags" placeholder="add tags on lowercase seprated by comma" id="tags"><br>
         <input name="event_incharge" placeholder="Event Incharge Name" type="text" id="event_incharge"><br>
         <input type="text" id="mobile_number" name="mobile_number" value="" placeholder="Event Incharge Mobile Number">

         <progress value="0" max="100" id="progressBar"></progress>
         <input type="submit" name="register" value="Create Event" id="newEventSubmit" class="file-submit">
   </form>`
let profileFormHTML = `
                  <h3 class="profileHead">Your Profile</h3>
                  <form id="profileForm">
                  <input autofocus type="text" name="society_name" value="" placeholder="society_name" id="society_name"><br>
                  <input name="college" placeholder="college" type="text" id="college"><br>
                  <input name="president_name" placeholder="president_name" type="text" id="president_name"><br>
                  <input name="p_mobile_number" placeholder="mobile_number" type="text" id="p_mobile_number" maxlength="10"><br>

                  <input type="submit" name="register" value="Update Profile" id="UpdateProfileSubmit">
               </form>`



let view ;

logoutButton.addEventListener('click', () => {

   localStorage.removeItem("user");
   axios({
      method:'get',
      url:'/api/user/logout'
   }).then((res) => {
      if (res.data.logout)
            window.location.href = '/organizer/login';
   })
})

profile.addEventListener('click', () => {
   content.innerHTML = profileFormHTML;

   const society_name = document.getElementById('society_name');
   const  college = document.getElementById('college');
   const president_name = document.getElementById('president_name');
   const p_mobile_number = document.getElementById('p_mobile_number');
   const UpdateProfileSubmit = document.getElementById('UpdateProfileSubmit');
   axios({
      method:'get',
      url:'/api/profile/'
   }).then((result) => {
      if(result.data.status === 404){
      }
      else{
         society_name.value = result.data.society_name;
         college.value = result.data.college;
         president_name.value = result.data.president_name;
         p_mobile_number.value = result.data.mobile_number;

         UpdateProfileSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let data = {
               society_name : society_name.value,
               college : college.value,
               president_name : president_name.value,
               mobile_number : p_mobile_number.value
            }
            axios({
               method:'post',
               url:'/api/profile/',
               data : data,
            }).then((result) => {
                  UpdateProfileSubmit.style.background = '#4CAF50'
               })
               .catch(() => {console.log('err');})
         })
      }
   }).catch((result) => {
      console.log(result);
   })
})
var config = {
  apiKey: "AIzaSyB3vQA5pao10VNudEeaReemUT62uaBxgtw",
  authDomain: "univent-81163.firebaseapp.com",
  databaseURL: "https://univent-81163.firebaseio.com",
  projectId: "univent-81163",
  storageBucket: "univent-81163.appspot.com"
};

   firebase.initializeApp(config);

   var storageRef = firebase.storage().ref('coverPhoto');
          var uploadsRef = firebase.database().ref('coverPhoto');
          var uploadsMetadata = {
            cacheControl: "max-age=" + (60 * 60 * 24 * 365), // One year of seconds
          };
            let downloadImg = {
               downloadURL: "",
               fullpath : ""
            };


createEvent.addEventListener('click', () => {
   content.innerHTML = eventFormHTML;



   const event_name = document.getElementById('event_name');
   const host_college = document.getElementById('host_college');
   const venue = document.getElementById('venue');
   const society = document.getElementById('society');
   const  description = document.getElementById('description');
   const form_link = document.getElementById('form_link');
   //const cover_link = document.getElementById('cover_link');
   const number_of_participants = document.getElementById('number_of_participants');
   const date = document.getElementById('date');
   const prize_description = document.getElementById('prize_description');
   const event_incharge = document.getElementById('event_incharge');
   const mobile_number = document.getElementById('mobile_number');
   const tags = document.getElementById('tags');
   const newEventSubmit = document.getElementById('newEventSubmit');
   document.getElementById('file-select').addEventListener('change', handleFileUploadChange);

   let selectedFile;

   function handleFileUploadChange(e) {
     selectedFile = e.target.files[0];
   }
   newEventSubmit.addEventListener('click', (e) => {

      const filesize = document.getElementById('file-select').files[0].size;
      var handleFileUploadSubmit = new Promise(function(resolve, reject){
         if (filesize <= 500000) {
            let filename =selectedFile.name + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const uploadTask = storageRef.child(`images/${filename}`).put(selectedFile, uploadsMetadata); //create a child directory called images, and place the file inside this directory
            uploadTask.on('state_changed', (snapshot) => {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log('Upload is ' + progress + '% done');
            document.getElementById("progressBar").value = progress - 10;

           // Observe state change events such as progress, pause, and resume
            }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
           }, () => {
              // Do something once upload is complete
              console.log('success');
              storageRef.child(`images/${filename}`).getDownloadURL().then((result) => {
                  downloadImg.fullpath = uploadTask.snapshot.metadata.fullPath;
                 downloadImg.downloadURL = result;

                 resolve( downloadImg);
              })
           });
        }else{
           console.log('file is too big');
           reject('null');
        }

      });

      e.preventDefault();
      handleFileUploadSubmit.then((downloadImg) => {
               console.log(downloadImg);
               let data = {
                  event_name : event_name.value,
                  host_college : host_college.value,
                  venue : venue.value,
                  society : society.value,
                  description : description.value,
                  form_link : form_link.value,
                  cover_photo:{
                     link: downloadImg.downloadURL,
                     name : downloadImg.fullpath
                  },
                  number_of_participants: number_of_participants.value,
                  date: date.value,
                  prize_description: prize_description.value,
                  tags :tags.value.split(','),
                  event_incharge : {
                     name : event_incharge.value,
                     mobile_number : mobile_number.value
                  }

               }
               axios.post('/api/event', data).then((result) => {
                     document.getElementById("progressBar").value = 100;
                     newEventSubmit.style.background = '#4CAF50'
                     console.log('sent');
                  })
                  .catch(() => {console.log('err');})
      }).catch((err) => {
               document.getElementById("progressBar").value = 0;
               newEventSubmit.style.background = 'red';
               console.log(err);
      })
   })
})


function editEvent(id) {
   axios.get(`/api/event/${id}`)
      .then((result) => {
         // add regex to date field
         let editFormHTML =
         `  <h3>Edit Event</h3>
            <form id="EditeventForm">
            <input autofocus type="text" name="event_name" value="${result.data.event_name}" placeholder="event_name" id="event_name"><br>
            <input name="host_college" placeholder="host_college" type="text" id="host_college" value="${result.data.host_college}"><br>
            <input name="venue" placeholder="venue" type="text" id="venue" value="${result.data.venue}"><br>
            <input name="society" placeholder="society" type="text" id="society" value="${result.data.society}"><br>
            <input name="description" placeholder="description" type="text" id="description" value="${result.data.description}"><br>
            <img src="${result.data.cover_link}" class="cover-pic" height="100">
            <input type="file" id="file-select" accept="image/jpeg, image/jpg" id="cover_link"/><br>
            <input name="form_link" placeholder="form_link" type="text" id="form_link" value="${result.data.form_link}"><br>
            <input name="number_of_participants" placeholder="number_of_participants" type="text" id="number_of_participants" value="${result.data.number_of_participants}"><br>
            <input name="date" placeholder="date" type="datetime" id="date" value="${result.data.date}"><br>
            <input name="prize_description" placeholder="prize_description" type="text" id="prize_description" value="${result.data.prize_description}"> <br>
                  <progress value="0" max="100" id="progressBar"></progress><br>
            <input type="submit" name="edit event" value="Edit Event" id="editEventSubmit">
         </form>`

         content.innerHTML = editFormHTML;

         const event_name = document.getElementById('event_name');
         const host_college = document.getElementById('host_college');
         const venue = document.getElementById('venue');
         const society = document.getElementById('society');
         const  description = document.getElementById('description');
         const form_link = document.getElementById('form_link');
         //const cover_link = document.getElementById('cover_link');
         const number_of_participants = document.getElementById('number_of_participants');
         const date = document.getElementById('date');
         const prize_description = document.getElementById('prize_description');
         const editEventSubmit = document.getElementById('editEventSubmit');
         downloadURL = result.data.cover_link; // .cover.downloadURL
         //const Rcfullpath = 'images/'+ result.cover.fullpath;
         let selectedFile;


      var readURL = function(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
             $('.cover-pic').attr('src', e.target.result);
         }

         reader.readAsDataURL(input.files[0]);
     }
   }


   let change= false;
   $("#file-select").on('change', function(e){
     readURL(this);

       selectedFile = e.target.files[0];
       console.log(selectedFile.size);
   change=true;
   });

         editEventSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            if(change == true){
               let filesize = selectedFile.size;
               var handleFileUploadSubmit = new Promise(function(resolve, reject){
                  if (filesize <= 500000) {
                     let filename =selectedFile.name + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                     const uploadTask = storageRef.child(`images/${filename}`).put(selectedFile, uploadsMetadata); //create a child directory called images, and place the file inside this directory
                     uploadTask.on('state_changed', (snapshot) => {

                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                     document.getElementById("progressBar").value = progress - 10;

                     // var desertRef = storageRef.child('fullpath');
                     // // Delete the file
                     // desertRef.delete().then(function() {
                     // // File deleted successfully
                     // console.log('del');
                     // }).catch(function(error) {
                     // console.log('olo');
                     // })
                     console.log('old file deleted');

                    // Observe state change events such as progress, pause, and resume
                     }, (error) => {
                     // Handle unsuccessful uploads
                     console.log(error);
                    }, () => {
                       // Do something once upload is complete
                       console.log('success');
                       storageRef.child(`images/${filename}`).getDownloadURL().then((result) => {
                           let fullpath = uploadTask.snapshot.metadata.fullPath;
                          downloadURL = result;

                          resolve( downloadURL);
                       })
                    });
                 }else{
                    console.log('file is too big');
                    reject(downloadURL);
                 }

               });
            }
            else{
               var handleFileUploadSubmit = new Promise(function (resolve, reject) {
                  resolve(downloadURL)
               })
            }

            handleFileUploadSubmit.then((downloadURL) => {

               let data = {
                  event_name : event_name.value,
                  host_college : host_college.value,
                  venue : venue.value,
                  society : society.value,
                  description : description.value,
                  form_link : form_link.value,
                  cover_link: downloadURL,
                  number_of_participants: number_of_participants.value,
                  date: date.value,
                  prize_description: prize_description.value
               }

               axios.put(`/api/event/${result.data._id}`, data).then((result) => {
                  editEventSubmit.style.background = '#4CAF50'
                  console.log('Edit request Sent');
               }).catch((err) => {console.log('err' + err);})
            })
         })
})
}
function deleteEvent(id) {
   axios.get(`/api/event/${id}`).then((result) => {
      let path = result.data.cover_photo.name.split('coverPhoto/').pop();
      var desertRef = storageRef.child(path);
      // Delete the file
      desertRef.delete().then(function() {
      // File deleted successfully
      console.log('del');
      }).catch(function(error) {
      console.log('olo');
      })
   })
   axios.delete(`/api/event/${id}`)
      .then((result) => {
         let user = localStorage.getItem('user');
         let url = `/api/event/?user=${user}`;
         axios.get(url).then((result) => {
            let data = "";
            console.log(result.data);
            result.data.forEach((key) => {
               let tagsHTML = ""
               key.tags.forEach((keyx) => {tagsHTML += `#${keyx}`})
                  data +=
                  `<li>
                     <h4>${key.event_name}</h4>
                     <h4>Host College: <span>${key.host_college}</span></h4>
                     <h4>Venue : <span>${key.venue}</span></h4>
                     <h4>Society : <span>${key.society}</span></h4>
                     <h4>Description : <span>${key.description}</span></h4>
                     <h4>Form Link : <span>${key.form_link}</span></h4>
                     <h4>Cover Photo : <span><img src="${key.cover_photo.link}" height="100" alt="${key.cover_photo.name}" /></span></h4>
                     <h4>Number of Participants : <span>${key.number_of_participants}</span></h4>
                     <h4>Date : <span>${key.date}</span></h4>
                     <h4>Prize Description : <span>${key.prize_description}</span></h4>
                     <h4>Tags : <span>${tagsHTML}</span></h4>
                     <h4>Event Incharge : <span>${key.event_incharge.name}</span></h4>
                     <h4>Contact No. : <span>${key.event_incharge.mobile_number}</span></h4>
                     <div class="action">
                        <button id=${key._id} onclick="editEvent(this.id)" class="edit">EDIT</button>
                        <button id=${key._id} onclick="deleteEvent(this.id)" class="delete">DELETE</button>
                     </div>
                  </li>`
               })
            content.innerHTML = data;



         }).catch((err) => {console.log('err ' + err);})
      })
      .catch((err) => {console.log('err ' + err );})
}

listEvents.addEventListener('click', () => {
   let user = localStorage.getItem('user');
   let url = `/api/event/?user=${user}`;
   axios.get(url).then((result) => {
      let data = "";
      console.log(result.data);
      result.data.forEach((key) => {
      let tagsHTML = ""
      key.tags.forEach((keyx) => {tagsHTML += `#${keyx}`})
         data +=
         `<li>
            <h4>${key.event_name}</h4>
            <h4>Host College: <span>${key.host_college}</span></h4>
            <h4>Venue : <span>${key.venue}</span></h4>
            <h4>Society : <span>${key.society}</span></h4>
            <h4>Description : <span>${key.description}</span></h4>
            <h4>Form Link : <span>${key.form_link}</span></h4>
            <h4>Cover Photo : <span><img src="${key.cover_photo.link}" height="100" alt="${key.cover_photo.name}" /></span></h4>
            <h4>Number of Participants : <span>${key.number_of_participants}</span></h4>
            <h4>Date : <span>${key.date}</span></h4>
            <h4>Prize Description : <span>${key.prize_description}</span></h4>
            <h4>Tags : <span>${tagsHTML}</span></h4>
            <h4>Event Incharge : <span>${key.event_incharge.name}</span></h4>
            <h4>Contact No. : <span>${key.event_incharge.mobile_number}</span></h4>
            <div class="action">
               <button id=${key._id} onclick="editEvent(this.id)" class="edit">EDIT</button>
               <button id=${key._id} onclick="deleteEvent(this.id)" class="delete">DELETE</button>
            </div>
         </li>`

         })
      content.innerHTML = data;
   }).catch((err) => {content.innerHTML = `<h2 class="noEvent">You Don't have any Events yet.</h2>`})
})
