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
	var promise = new Promise( (resolve) => {
		actorRepo().getEventsForStreak()
		.then((data)=>{
			var actors = []
			var counter = 1;
			var e = data[0];
			for(var i = 1; i < data.length; i++){
				var event = data[i];
				if(event.actor_id == e.actor_id){
					var eventDate = new Date(event.created_at);
					eventDate.setHours(0,0,0,0);
					var dateBefore = new Date(e.created_at);
					dateBefore.setHours(0,0,0,0);
					if(eventDate - dateBefore > 1){
						console.log("Streak break: ", eventDate - dateBefore)
					}					
					counter++;
				}else{
					actors.push({actor_id: e.actor_id, streak: counter});
					e = event;
					counter = 1;
				}
			}
			return actors;
		})
		.then( (actors)=>{
			// console.log("Actors: ", actors)
			resolve(actors)
		})	
	});

	// return promise;
	return actorRepo().getStreak();
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak,
	getById: getById
};

















