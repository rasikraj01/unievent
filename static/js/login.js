const submit = document.getElementById("submit");

if (!localStorage.getItem("token"))
    localStorage.setItem("token", "a");

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
               localStorage.setItem("token", res.data.token);
               console.log('logged in');
               //document.window.location.href = '/organizer/dashboard';
               const headers = {Authorization : localStorage.getItem("token")}
               axios({
                  method:'get',
                  url:'/organizer/dashboard',
                  responseType:'stream'
               })
            }
            else{
               console.log('err');
            }
         })
      .catch((err) => {
         console.log(err);
         })
});
