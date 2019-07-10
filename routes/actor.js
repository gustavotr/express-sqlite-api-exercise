var express = require('express');
var router = express.Router();
var cActors = require('../controllers/actors')

// Routes related to actor.
router.put('/', function(req, res) { 
    var body = req.body
    cActors.updateActor(body).then( data => {
        res.status(data).end()
    })
})

router.get('/', function(req, res){    
    cActors.getAllActors().then( data => {        
        res.json(data)
    })
})

router.get('/streak', function(req, res){
    cActors.getStreak().then( data => {  
        console.log("Streak length:", data.length)              
        res.json(data)
    })
})


module.exports = router;