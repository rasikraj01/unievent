const express = require('express');
const router = express.Router();


router.get('/event', (req, res) => {
    res.send('rasik')
});

router.post('/event',(req, res) => {
    res.send('rasik_post')
});

router.put('event/:id', (req, res) => {
    res.send(req.params.id);
});
router.delete('event/:id', (req, res){
    res.send(req.params.id);
});
module.exports = router;