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
const profileForm = document.getElementById('profileForm');
profileForm.style.display = 'none';



const username = document.getElementById('username');
const mobile_number = document.getElementById('mobile_number');
const  college = document.getElementById('college');
const field_of_study = document.getElementById('field_of_study');
const year = document.getElementById('year');
const UpdateProfileSubmit = document.getElementById('UpdateProfileSubmit');


let view ;

logoutButton.addEventListener('click', () => {
   localStorage.removeItem("token");
   window.location.href = '/organizer/login';
})

profile.addEventListener('click', () => {
   profileForm.style.display = 'block';
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
      }
   }).catch((result) => {
      console.log(result);
   })
})

UpdateProfileSubmit.addEventListener('click', (e) => {
   e.preventDefault();
   data = {
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
