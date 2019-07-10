var express = require('express');
var router = express.Router();
var cActors = require('../controllers/actors')

// Routes related to actor.
router.put('/', function(req, res) { 
    var actor = req.body
    cActors.updateActor(actor)
        .then( code => {
            res.status(code).end()
        })
})

router.get('/', function(req, res){    
    cActors.getAllActorsOrderedByEvents()
        .then( data => {        
            res.json(data)
        })
})

router.get('/streak', function(req, res){
    cActors.getStreak().then( data => {               
        res.json(data)
    })
})


module.exports = router;