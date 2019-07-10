const EventModel = require('../models/event_model');
const ActorModel = require('../models/actor_model');
const RepoModel = require('../models/repo_model');
const DAO = require('../models/dao');

const getAllEvents = () => {
	const dao = new DAO();
	const eventModel = new EventModel(dao);
	const p = eventModel.getAll()
		.then( events => {
			let evts = [];
			events.forEach( e => {
				evts.push(parseEventObj(e));
			});
			return evts;
		});
	return p;
};

const getEventsWithActorID = (id) => {	
	const dao = new DAO();
	const eventModel = new EventModel(dao);
	const actorModel = new ActorModel(dao);
	const p = actorModel.getById(id)
				.then(row => {
					if(!row){
						throw 404
					};									
				})
				.then(() => eventModel.getAllByActorId(id))
				.then(rows => {
					let evts = [];
					rows.forEach( e => {
						evts.push(parseEventObj(e));
					});
					return evts;
				})
	return p;
}

const addEvent = (event) => {	
	const dao = new DAO();
	const eventModel = new EventModel(dao);	
	const actorModel = new ActorModel(dao);
	const repoModel = new RepoModel(dao);
	const p = eventModel.insert(event.id, event.type, event.actor.id, event.repo.id, event.created_at)
		.then(() => actorModel.insert(event.actor.id, event.actor.login, event.actor.avatar_url))
		.then(() => repoModel.insert(event.repo.id, event.repo.name, event.repo.url))	
	return p;									
};

const eraseEvents = () => {
	const dao = new DAO();
	const eventModel = new EventModel(dao);	
	const actorModel = new ActorModel(dao);
	const repoModel = new RepoModel(dao);
	const p = eventModel.deleteAll()
		.then( ()=>{
			actorModel.deleteAll()
			repoModel.deleteAll()
		});
	return p;
};

const parseEventObj = (e) => {
	return {
		id : e.id,
		type : e.type,
		actor : {
			id : e.actor_id,
			login : e.login,
			avatar_url : e.avatar_url
		},
		repo : {
			id : e.repo_id,
			name : e.name,
			url : e.url
		},
		created_at : e.created_at
	}
}

module.exports = {	
	getAllEvents,
	addEvent,	
	eraseEvents,
	getEventsWithActorID
};

















