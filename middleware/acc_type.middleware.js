module.exports = function acc_type_authorization(req, res, next) {
   if(req.user.acc_type.toLowerCase() === 'organizer'){
      next();
   }
   else{
      res.redirect('/api/unauthorized');
   }
}
