const submit = document.getElementById("submit");

submit.addEventListener('click' , (e) => {
   e.preventDefault();
   const society_email = document.getElementById("society_email").value;
   const password = document.getElementById("password").value;
   // const society_name = document.getElementById("society_name").value;
   // const college = document.getElementById("college").value;
   // const president_name = document.getElementById("president_name").value;
   // const mobile_number = document.getElementById("p_mobile_number").value;
   // // check if all values are valid and not empty and  then make the request
   // const profile_data = {
   //    society_name,
   //    college,
   //    president_name,
   //    mobile_number
   // }
   const data = {
      society_email,
      password,
      acc_type : 'organizer'
   }
   axios.post('/api/user/register', data)
      .then((res) => {
            document.getElementById('register_form').reset();
            console.log(res.data);
            //axios.post
            window.location.href = '/organizer/login';
         })
      .catch((err) => {
         document.getElementById('register_form').reset();
         console.log(err);
         document.getElementById('register').innerHTML += `<div>Error</div>`;
         })
});
