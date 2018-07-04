const express = require('express');
const router = express.Router();

router.get('aa/', (req, res) => {
   res.send('rasik');
})

module.exports = router;
