var EventModel = require('../model/event_model')
var ActorModel = require('../model/actor_model')
var RepoModel = require('../model/repo_model')
var AppDAO = require('../model/dao')

var dao = new AppDAO()

var eventsRepo = () => {
	var eventsRepo = new EventModel(dao)
	return eventsRepo
}

var actorRepo = () => {
	var actorRepo = new ActorModel(dao)
	return actorRepo
}

var repoRepo = () => {
	var repoRepo = new RepoModel(dao)
	return repoRepo
}

module.exports = {
    eventsRepo,
    actorRepo,
    repoRepo
}