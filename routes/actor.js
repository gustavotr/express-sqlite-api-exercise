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
        res.send(data)
    })
})


module.exports = router;