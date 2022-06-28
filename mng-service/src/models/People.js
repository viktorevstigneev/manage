const { Schema, model } = require('mongoose');

const PeopleSchema = new Schema({
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	birthday: {
		type: String,
	},
	adress: {
		type: String,
	},
	sekty: [],
	roditely: [],
	jurnal: [],
	olimpiady:[],
	sorevy: [],

});

const People = model('People', PeopleSchema);

const createTeam = (data) => {
	return People.create(data);
};

const getTeamData = () => {
	return People.find();
};

const getPersonData = (id) => {
	return People.findOne({ _id: id });
};

const deleteTeam = (id) => {
	return People.deleteOne({ _id: id });
};

const updateTeam = (id, data) => {
	return People.updateOne({ _id: id }, { ...data });
};

const getStudent = (data) => {
	console.log('data: ', data);
	return People.find(data);
};

module.exports = {
	createTeam,
	getTeamData,
	deleteTeam,
	updateTeam,
	getPersonData,
	People,
	getStudent,
};
