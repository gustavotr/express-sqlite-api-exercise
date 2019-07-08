var EventModel = require('../model/event_model')
var ActorModel = require('../model/actor_model')
var RepoModel = require('../model/repo_model')
var AppDAO = require('../model/dao')
var dao = new AppDAO()
var eventsRepo = new EventModel(dao)
var actorRepo = new ActorModel(dao)
var repoRepo = new RepoModel(dao)

var getAllEvents = () => {		
	return eventsRepo.getAll()
};

var addEvent = (body) => {	
	return eventsRepo.create(body.id, body.type, body.actor.id, body.repo.id).then( data => {
		actorRepo.create(body.actor.id, body.actor.login, body.actor.avatar_url).catch(console.log)
		repoRepo.create(body.repo.id, body.repo.name, body.repo.url).catch(console.log)
		return data
	})
};


var getByActor = (id) => {
	
};


var eraseEvents = () => {
	return eventsRepo.deleteAll()
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















