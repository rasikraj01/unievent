const submit = document.getElementById("submit");

submit.addEventListener('click' , (e) => {
   e.preventDefault();
   const society_email = document.getElementById("society_email").value;
   const password = document.getElementById("password").value;

      const data = {
         society_email,
         password,
         acc_type : 'organizer'
      }
      axios.post('/api/user/register', data)
         .then((res) => {
            if(res.data._id != null){
               document.getElementById('register_form').reset();
               console.log(res.data);
               window.location.href = '/organizer/login';
            }else{
            console.log(res);
            }
            })
         .catch((err) => {
            document.getElementById('register_form').reset();
            console.log(err);
            document.getElementById('register').innerHTML += `<div>Error</div>`;
            })

});
