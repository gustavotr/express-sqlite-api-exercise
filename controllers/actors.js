var ActorModel = require('../model/actor_model')
var AppDAO = require('../model/dao')
var dao = new AppDAO()
var actorRepo = new ActorModel(dao)

var getAllActors = () => {
	
};

var updateActor = (body) => {
	return actorRepo.getById(body.id).then( data => {
		var code = 200
		if( data.length == 0){
			code = 404
		}else if(data.login != body.login){
			code = 400
		}else{
			actorRepo.updateAvatarUrl(body.id, body.avatar_url)
		}
		return code
	})

};

var getStreak = () => {
	return actorRepo.getStreak()
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















