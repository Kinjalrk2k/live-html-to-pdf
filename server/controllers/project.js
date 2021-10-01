const Project = require('../models/Project');

const getParticularProject = async (req, res) => {
	const { id } = req.params;

	console.log('Getting project ID', id);
	const project = await Project.findById(id).populate('owner');
	const forks = await Project.find({ forked: id }).populate('owner');
	res.json({ ...project._doc, forks });
};

const updateExistingProject = async (req, res) => {
	const { id } = req.params;
	const { template, data, options } = req.body;

	const project = await Project.findById(id);
	const owner = project.owner;

	project.template = template;
	project.data = data;
	project.options = options;

	if (owner === undefined) {
		console.log('Can save 1');
		project.owner = req.user._id;
	} else if (owner.equals(req.user._id)) {
		console.log('Can save 2');
	} else {
		console.log('Cannot save');
		return res.status(403).json({ err: "You don't own this project" });
	}

	project.save();

	// const updatedProject = await Project.findById(id).populate("owner");
	const updatedProject = await Project.populate(project, { path: 'owner' });
	// console.log(updatedProject);

	res.json(updatedProject);
};

const deleteExistingProject = async (req, res) => {
	const { id } = req.params;

	await Project.findOneAndDelete({
		_id: id,
		owner: req.user._id,
	});

	res.json({ success: true });
};

const editProjectTitle = async (req, res) => {
	await Project.findByIdAndUpdate(req.params.id, { title: req.body.title });
	res.json({ success: true });
};

module.exports = {
	getParticularProject,
	updateExistingProject,
	deleteExistingProject,
	editProjectTitle,
};
