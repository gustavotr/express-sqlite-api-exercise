var express = require('express');
var router = express.Router();
var cEvents = require('../controllers/events')

// Routes related to event
router.get('/', function(req, res, next) {    
  cEvents.getAllEvents().then(data =>{    
    res.send(data)
  })
});

router.get('/actors/:actorID', function(req, res, next) { 
  var actorID = req.params.actorID   
  cEvents.getByActor(actorID).then(data =>{    
    res.send(data)
  })
});


router.post('/', function(req, res){
  var body = req.body;
  cEvents.addEvent(body).then(data => {
    console.log(data)
    res.status(201).end()    
  }).catch( ()=> {
    res.status(400).end()
  })
})

module.exports = router;