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
    var promise;
    if(events.length == 0){
      promise = new Promise( (resolve) => {
        resolve(events);
      });
    }else{
      promise = new Promise( (resolve) => {
        var evts = []
        for(const i in events)  {
          var event = events[i];
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
              if(i == events.length -1)
                resolve(evts);
            })  
        }
      })    
    }
    return promise;
  }).then( data => {    
    res.json(data);    
  })
});

router.get('/actors/:actorID', function(req, res, next) { 
  var actorID = req.params.actorID 
  cEvents.getByActor(actorID).then(events =>{ 
    return events 
  })
  .then( (events) => {
    var promise;
    if(events.length == 0){
      promise = new Promise( (resolve) => {
        resolve(events);
      });
    }else{
      promise = new Promise( (resolve) => {
        var evts = []
        for(const i in events){
          var event = events[i];
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
            });  
        }
      });   
    }
    return promise;
  }).then( data => {            
    res.json(data)
  })  
});


router.post('/', function(req, res){
  var body = req.body;
  cEvents.addEvent(body).then( () => {    
    res.status(201).end()    
  }).catch( ()=> {
    res.status(400).end()
  })
})

module.exports = router;