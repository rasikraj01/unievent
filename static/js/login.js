const submit = document.getElementById("submit");


submit.addEventListener('click' , (e) => {
   const society_email = document.getElementById("society_email").value;
   const password = document.getElementById("password").value;
   e.preventDefault();
   // check if all values are valid and not empty and  then make the request
   const data = {
      society_email,
      password
   }
   axios.post('/api/user/login', data)
      .then((res) => {
            document.getElementById('login_form').reset();
            console.log(res.data);
            if (res.data.success)
               window.location.href = '/organizer/dashboard';
            else
               console.log(res.data.message);
         })
      .catch((err) => console.log(err))
});
