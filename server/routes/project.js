const router = require('express').Router();
const { decodeIDToken } = require('../middlewares/firebase');
const Project = require('../models/Project');
const {
	getParticularProject,
	updateExistingProject,
	deleteExistingProject,
	editProjectTitle,
} = require('../controllers/project');

router.get('/:id', getParticularProject);

router.post('/:id', decodeIDToken, updateExistingProject);

router.delete('/:id', decodeIDToken, deleteExistingProject);

router.patch('/:id/title', decodeIDToken, editProjectTitle);

module.exports = router;
