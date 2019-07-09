var repoRepo = require('./models').repoRepo

var getById = (id) => {
	return repoRepo().getById(id)
}


module.exports = {
	getById: getById
};

















