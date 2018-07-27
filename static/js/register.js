//const axios = require('axios');

const submit = document.getElementById("submit");

submit.addEventListener('click' , (e) => {
   const name = document.getElementById("name").value;
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   e.preventDefault();
   // check if all values are valid and not empty and  then make the request
   const data = {
      name,
      email,
      password,
      acc_type : 'organizer'
   }
   axios.post('/api/user/register', data)
      .then((res) => {
            document.getElementById('register_form').reset();
            console.log(res.data);
            let success = `<a href="/organizer/login">Registeration successFull. <br> Click Here to Login</a>`;
            document.getElementById('register').innerHTML += success;
         })
      .catch((err) => {
         document.getElementById('register_form').reset();
         console.log(err);
         document.getElementById('register').innerHTML += `<div>Error</div>`;
         })
});
