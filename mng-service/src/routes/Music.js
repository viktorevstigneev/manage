const express = require('express');
const multer = require('multer');

const {
	handleAddMusic,
	handleGetMusic,
	handleDeleteMusic,
} = require('../controllers/Music');

const isAuthenticated = require('../utils/isAuthenticated');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/sounds/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (['audio/mpeg'].includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });
const router = express();
const type = upload.single('sound');

router.get('/music', handleGetMusic);
router.post('/music',type ,handleAddMusic);
router.delete('/music/:id', handleDeleteMusic);

module.exports = router;
