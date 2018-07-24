const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
   res.json({message : 'you are not authorized to access this page'})
});

module.exports = router;
