const ActorModel = require('../models/actor_model');
const DAO = require('../models/dao');

var getAllActorsOrderedByEvents = () => {
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	return actorModel.getAllActors()
};

var getById = (id) => {
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	return actorModel.getById(id)
}

var updateActor = (actor) => {	
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	var p = actorModel.getById(actor.id)
		.then( row => {			
			if( !row ){
				throw 404
			}else if(row.login != actor.login){
				throw 400
			}
			return null;
		})
		.then( () => actorModel.updateAvatarUrl(actor.id, actor.avatar_url) )
		.then( () => 200)
		.catch( err => err);
	
	return p;
};

var getStreak = () => {
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	var promise = new Promise( (resolve) => {
		actorModel.getEventsForStreak()
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
	return actorModel.getStreak();
};


module.exports = {
	updateActor,
	getAllActorsOrderedByEvents,
	getStreak,
	getById
};

















