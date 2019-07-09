var actorRepo = require('./models').actorRepo

var getAllActors = () => {
	return actorRepo().getAllActors()
};

var getById = (id) => {
	return actorRepo().getById(id)
}

var updateActor = (body) => {
	return actorRepo().getById(body.id).then( data => {
		var code = 200
		if( data.length == 0){
			code = 404
		}else if(data.login != body.login){
			code = 400
		}else{
			actorRepo().updateAvatarUrl(body.id, body.avatar_url)
		}
		return code
	})

};

var getStreak = () => {
	return actorRepo().getStreak()
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak,
	getById: getById
};

















