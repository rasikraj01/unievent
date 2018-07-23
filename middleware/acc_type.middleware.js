const acc_authorization = (req, res, next) => {
   // authorization logic goes here
   if(req.user.acc_type.toLowerCase() === 'organiser'){
      next();
   }
   else{
      res.redirect('/api/unauthorized');
   }
}

module.exports = acc_authorization;
