const { HttpStatusCode } = require('../constants');
const { People, createTeam, getTeamData, deleteTeam, updateTeam, getPersonData, getStudent } = require('../models/People');

const handleAddTeam = async (req, res) => {
	try {
		console.log('req.body: ', req.body.name);
		const {name, surname, lastname, birthday, adress,  mom, dad, sekty} = req.body
		const result = await createTeam({name, surname, lastname, birthday, adress, sekty ,roditely: [{mom, dad}]});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


const handleGetTeam = async (req, res) => {
	try {
		let result;
		result = await getTeamData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleFindStudent = async (req, res) => {
	try {
		const {name, surname, lastname, birthday, adress} = req.body
		let result;
		result = await getStudent({name: name, surname: surname, lastname:lastname, birthday:birthday, adress: adress});
		console.log('result: ', result);
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetPerson = async (req, res) => {
	try {
		let result;
		result = await getPersonData(req.params.id);
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


const handleDeleteTeam = async (req, res) => {
	try {
		const result = await deleteTeam(req.params.id);
		
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateTeam = async (req, res) => {
	try {
		const result = await updateTeam(req.params.id, {roditely: [{mom:req.body.mom, dad: req.body.dad}]});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
	}
};

const handleUploadPhoto = async (req, res) => {
	try {
	
		let filedata = req.file;
;

		const result = await updateTeam(req.query.id, { avatar: filedata.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

module.exports = {
	handleAddTeam,
	handleGetTeam,
	handleDeleteTeam,
	handleUploadPhoto,
	handleUpdateTeam,
	handleGetPerson,
	handleFindStudent
};
