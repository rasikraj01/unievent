const submit = document.getElementById("submit");


submit.addEventListener('click' , (e) => {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   e.preventDefault();
   // check if all values are valid and not empty and  then make the request
   const data = {
      email,
      password
   }
   axios.post('/api/user/login', data)
      .then((res) => {
            document.getElementById('login_form').reset();
            console.log(res.data);
            if (res.data.success) {
               window.location.href = '/organizer/dashboard';
            }
            else
               console.log('err');
         })
      .catch((err) => {
         console.log(err);
         })
});
