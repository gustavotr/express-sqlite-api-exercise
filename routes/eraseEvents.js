var express = require('express');
var router = express.Router();
var cEvents = require('../controllers/events')

// Route related to delete events
router.delete('/', function(req, res){
    cEvents.eraseEvents().then( () => {
      res.status(200).end()
    })
  })

module.exports = router;