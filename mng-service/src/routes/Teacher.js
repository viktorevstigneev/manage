const express = require('express');
const multer = require('multer');

const {
	handleAddTeacher,
  handleGetTeachers,
  handleGetTeacher,
  handleDeleteTeacher,
  handleUpdateTeacher,
	handleFindTeacher
} = require('../controllers/Teacher');
const isAuthenticated = require('../utils/isAuthenticated');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'].includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });
const router = express();
const type = upload.single('avatar');

router.get('/teacher', handleGetTeachers);
router.get('/teacher/:id', handleGetTeacher);
router.post('/teacher',type,handleAddTeacher);
router.post('/findteacher',type,handleFindTeacher);
router.delete('/teacher/:id', handleDeleteTeacher);
router.patch('/teacher/:id', type, handleUpdateTeacher);

module.exports = router;
