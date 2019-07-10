const RepoModel = require('../models/repo_model');
const DAO = require('../models/dao');

var getById = (id) => {
	const dao = new DAO();
	const repoModel = new RepoModel(dao);
	return repoModel.getById(id)
}


module.exports = {
	getById
};

















