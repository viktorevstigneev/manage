const { Schema, model } = require('mongoose');

const TeacherSchema = new Schema({
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
	subject: {
		type: String,
	},


});

const Teacher = model('Teacher', TeacherSchema);

const createTeacher = (data) => {
	return Teacher.create(data);
};

const getTeachersData = () => {
	return Teacher.find();
};

const getTeacher = (id) => {
	return Teacher.findOne({ _id: id });
};

const deleteTeacher = (id) => {
	return Teacher.deleteOne({ _id: id });
};

const updateTeacher = (id, data) => {
	return Teacher.updateOne({ _id: id }, { ...data });
};

const getFindedTeacher = (data) => {
	return Teacher.find(data);
};

module.exports = {
	createTeacher,
	getTeachersData,
	getTeacher,
	deleteTeacher,
	updateTeacher,
	Teacher,
	getFindedTeacher
};
