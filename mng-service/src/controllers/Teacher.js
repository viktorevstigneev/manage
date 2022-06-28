const { HttpStatusCode } = require('../constants');
const { 	createTeacher, getTeachersData, getTeacher, deleteTeacher, updateTeacher, Teacher, getFindedTeacher} = require('../models/Teacher');

const handleAddTeacher = async (req, res) => {
	try {
		const {name, surname, lastname, birthday, adress, subject} = req.body
		const result = await createTeacher({name, surname, lastname, birthday, adress, subject});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetTeachers = async (req, res) => {
	try {
		let result;
		result = await getTeachersData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleFindTeacher = async (req, res) => {
	try {
		const {name, surname, lastname, birthday, subject} = req.body
		let result;
		result = await getFindedTeacher({name, surname, lastname, birthday, subject});
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};




const handleGetTeacher = async (req, res) => {
	try {
		let result;
		result = await getTeacher(req.params.id);
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


const handleDeleteTeacher= async (req, res) => {
	try {
		const result = await deleteTeacher(req.params.id);
		
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateTeacher = async (req, res) => {
	try {
		const result = await updateTeacher(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			avatar: req.body.avatar,
		});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
	}
};


module.exports = {
	handleAddTeacher,
  handleGetTeachers,
  handleGetTeacher,
  handleDeleteTeacher,
  handleUpdateTeacher,
	handleFindTeacher
};
