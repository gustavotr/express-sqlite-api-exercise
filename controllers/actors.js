const ActorModel = require('../models/actor_model');
const EventModel = require('../models/event_model');
const DAO = require('../models/dao');
const moment = require('moment');

var getAllActorsOrderedByEvents = () => {
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	return actorModel.allOrderedByEvents()
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

const getStreak = () => {
	const dao = new DAO();
	const actorModel = new ActorModel(dao);
	const eventModel = new EventModel(dao);
	const temp_dao = new DAO(':memory:');
    const temp_actorModel = new ActorModel(temp_dao);

	const calcStreak = (actor) =>{
		return new Promise((resolve, reject) => {
			eventModel.getAllByActorId(actor.id, true)
				.then(events => {
					let streak = 0;
					let maxStreak = 0;
					let lastEvent = null;
					for(const i in events){
						if(lastEvent == null || moment(lastEvent).isBefore(moment(events[i].created_at))){
							lastEvent = events[i].created_at;
						}
						if (i == 0) {
							streak++;
							continue;
						}

						let momentPrev = moment(events[i-1].created_at);
						let momentCurr = moment(events[i].created_at);
						momentPrev = moment(momentPrev.format('YYYY-MM-DD'));
						momentCurr = moment(momentCurr.format('YYYY-MM-DD'));
						let diff = momentCurr.diff(momentPrev,'days');
						
						if (diff == 1)
							streak++;
						else
							streak = 0;
						
						if (maxStreak <= streak)
							maxStreak = streak;
					}
					resolve(temp_actorModel.insertTempStreak(actor.id, actor.login, actor.avatar_url, maxStreak, lastEvent));
				});
		});
	}

	const p = temp_actorModel.createTemp()
		.then(() => actorModel.all())
		.then( actors => Promise.all(actors.map(calcStreak)))
		.then(() => temp_actorModel.getAllStreaks())
		.then(streaks => {
            let sanitized = [];
            streaks.forEach(streak => sanitized.push({
                id : streak.id,
                login : streak.login,
                avatar_url : streak.avatar_url
            }));
            return sanitized;
		});		
	
	return p;
};


module.exports = {
	updateActor,
	getAllActorsOrderedByEvents,
	getStreak,
	getById
};

















