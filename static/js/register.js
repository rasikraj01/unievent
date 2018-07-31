const submit = document.getElementById("submit");

submit.addEventListener('click' , (e) => {
   e.preventDefault();
   const society_email = document.getElementById("society_email").value;
   const password = document.getElementById("password").value;
   // check if all values are valid and not empty and  then make the request
   const data = {
      society_email,
      password,
      acc_type : 'organizer'
   }
   axios.post('/api/user/register', data)
      .then((res) => {
            document.getElementById('register_form').reset();
            console.log(res.data);
            window.location.href = '/organizer/login';
         })
      .catch((err) => {
         document.getElementById('register_form').reset();
         console.log(err);
         document.getElementById('register').innerHTML += `<div>Error</div>`;
         })
});
