const express = require('express');
const router = express.Router();
const cEvents = require('../controllers/events')
const cActors = require('../controllers/actors')
const cRepos = require('../controllers/repo')

// Routes related to event
router.get('/', function(req, res, next) {    
  cEvents.getAllEvents().then(events =>{     
    res.json(events);    
  });
});

router.get('/actors/:actorID', function(req, res, next) { 
  const actorID = req.params.actorID;
  cEvents.getEventsWithActorID(actorID)
    .then(events =>{ 
      res.json(events) 
    })
    .catch( () => res.status(404).end() );
});


router.post('/', function(req, res){
  const event = req.body;
  cEvents.addEvent(event)
    .then( () => {    
      res.status(201).end()    
    }).catch( ()=> res.status(400).end() );
})

module.exports = router;