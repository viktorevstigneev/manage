const { HttpStatusCode } = require('../constants');
const { People, createMusic, getMusicData, deleteMusic, updateMusic } = require('../models/Music');

const handleAddMusic = async (req, res) => {
	try {
		

		const result = await createMusic({ name: req.body.name, stringPath: req.file.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetMusic = async (req, res) => {
	try {
		let result;
		result = await getMusicData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteMusic = async (req, res) => {
	try {
		const result = await deleteMusic(req.params.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateMusic = async (req, res) => {
	try {
	
		const result = await updateMusic(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			createdDate: req.body.createdDate,
			logo: req.file.filename,
		});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

module.exports = {
	handleAddMusic,
	handleGetMusic,
	handleDeleteMusic,
	handleUpdateMusic,
};
