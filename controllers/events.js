var eventsRepo = require('./models').eventsRepo
var actorRepo = require('./models').actorRepo
var repoRepo = require('./models').repoRepo

var getAllEvents = () => {	
	return eventsRepo().getAll()
};

var addEvent = (body) => {	
	return eventsRepo().create(body.id, body.type, body.actor.id, body.repo.id, body.created_at).then( data => {
		actorRepo().create(body.actor.id, body.actor.login, body.actor.avatar_url).catch( () => {})
		repoRepo().create(body.repo.id, body.repo.name, body.repo.url).catch( () => {})
	})
};


var getByActor = (id) => {
	return eventsRepo().getById(id)	
};


var eraseEvents = () => {
	return eventsRepo().deleteAll().then( ()=>{
		actorRepo().deleteAll()
		repoRepo().deleteAll()
	})
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















