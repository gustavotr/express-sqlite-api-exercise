var express = require('express');
var router = express.Router();
var cEvents = require('../controllers/events')
var cActors = require('../controllers/actors')
var cRepos = require('../controllers/repo')

// Routes related to event
router.get('/', function(req, res, next) {    
  cEvents.getAllEvents().then(events =>{ 
    return events
  }).then( (events) => {
    new Promise( (resolve) => {
      var evts = []
      for(const i in events)  {
        var event = events[i]
        cActors.getById(event.actor_id)
          .then( data => {
            event.actor = data
            delete(event.actor_id)  
            return cRepos.getById(event.repo_id)
          })
          .then( data => {
            event.repo = data[0]
            delete(event.repo_id)
            evts.push(event)
            if(i == data.length -1)
              resolve(evts)
          })  
      }
    })
  }).then( data => {
    res.json(data)
  })
});

router.get('/actors/:actorID', function(req, res, next) { 
  var actorID = req.params.actorID 
  cEvents.getByActor(actorID).then(events =>{ 
    return events 
  })
  .then( (events) => {
    new Promise( (resolve) => {
      var evts = []
      for(const i in events)  {
        var event = events[i]
        cActors.getById(event.actor_id)
          .then( data => {
            event.actor = data
            delete(event.actor_id)  
            return cRepos.getById(event.repo_id)
          })
          .then( data => {
            event.repo = data[0]
            delete(event.repo_id)
            evts.push(event)
            if(i == data.length -1)
              resolve(evts)
          })  
      }
    }).then( data => {
      res.json(data)
    })
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