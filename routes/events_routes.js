const express = require('express');
const Event = require('../models/event');

const router = express.Router();

router.get('/event', (req, res) => {
    Event.find({}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        console.log(err);

    })
});

router.get('/event/:id', (req, res) => {
    Event.findById({_id : req.params.id}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/event',(req, res) => {
    Event.create(req.body).then((result) =>{
        res.status(200).send(result)
    }).catch((next)=>{
    //    console.log(err)
    });

});

router.put('/event/:id', (req, res) => {
    Event.findByIdAndUpdate({_id : req.params.id}, req.body).then(()=> {
        Event.findById({_id : req.params.id}).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(err)
        });
    }).catch((err) => {
        console.log(err);
    });
});
router.delete('/event/:id', (req, res) => {
    Event.findByIdAndRemove({_id : req.params.id}).then((result)=> {
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;
