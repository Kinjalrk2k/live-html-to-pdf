require("dotenv/config");

const express = require("express");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");
const pdf = require("pdf-creator-node");
const Project = require("./models/Project");

const { decodeIDToken } = require("./middlewares/firebase");

const app = express();

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = process.env.mongoURI;
// Datebase connection
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

app.get("/", (req, res) => {
  return res.json({ app: "Live HTML to PDF", developer: "Kinjal Raykarmakar" });
});

app.post("/pdf", async (req, res) => {
  let { template, options, data } = req.body;

  try {
    options = JSON.parse(options);
    data = JSON.parse(data);

    const document = {
      html: template,
      data,
      path: "./output.pdf",
      type: "buffer",
    };

    pdf.create(document, options).then((file) => {
      // console.log(file);
      return res.send(file);
    });
  } catch (e) {
    console.log("ERROR: ", e.message);
    return res.status(400).json({ err: e.message });
  }
});

app.get("/new", decodeIDToken, async (req, res) => {
  let query = {};
  if (req.user) {
    console.log("Owner:", req.user._id);
    query["owner"] = req.user._id;
  }

  const newProject = new Project(query);
  const { _id } = await newProject.save();
  console.log("Project created with ID:", _id);

  return res.json({ projectId: _id, owner: req.user });
});

app.get("/fork/:projectId", decodeIDToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ err: "You need to login to create a fork" });
  }

  const { template, data, options, title } = await Project.findById(
    req.params.projectId
  );
  const newProject = new Project({
    title: `Fork of ${title}`,
    template,
    data,
    options,
    owner: req.user._id,
    forked: req.params.projectId,
  });
  const { _id } = await newProject.save();

  console.log(
    `Fork of ${req.body.projectId} was created. New Project ID: ${_id}`
  );

  return res.json({ projectId: _id, owner: req.user });
});

app.post("/pull/:originalProjectId", decodeIDToken, async (req, res) => {
  /**
   * the projectID in the req.params is the original project ID, i.e. "where to pull"
   * the projectID in the req.body is the forked project ID, i.e. "from where to pull"
   */
  const { originalProjectId } = req.params;
  const { forkedProjectId } = req.body;

  const { template, data, options } = await Project.findById(forkedProjectId);
  await Project.findByIdAndUpdate(originalProjectId, {
    template,
    data,
    options,
  });

  return res.json({ template, data, options });
});

app.get("/project/:id", async (req, res) => {
  const { id } = req.params;

  console.log("Getting project ID", id);
  const project = await Project.findById(id).populate("owner");
  const forks = await Project.find({ forked: id }).populate("owner");

  res.json({ ...project._doc, forks });
});

app.post("/project/:id", decodeIDToken, async (req, res) => {
  const { id } = req.params;
  const { template, data, options } = req.body;

  const project = await Project.findById(id);
  const owner = project.owner;

  project.template = template;
  project.data = data;
  project.options = options;

  if (owner === undefined) {
    console.log("Can save 1");
    project.owner = req.user._id;
  } else if (owner.equals(req.user._id)) {
    console.log("Can save 2");
  } else {
    console.log("Cannot save");
    return res.status(403).json({ err: "You don't own this project" });
  }

  project.save();

  // const updatedProject = await Project.findById(id).populate("owner");
  const updatedProject = await Project.populate(project, { path: "owner" });
  // console.log(updatedProject);

  res.json(updatedProject);
});

app.delete("/project/:id", decodeIDToken, async (req, res) => {
  const { id } = req.params;

  await Project.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  res.json({ success: true });
});

app.get("/projects", decodeIDToken, async (req, res) => {
  let projects = [];
  if (req.user) {
    console.log("Owner:", req.user._id);
    projects = await Project.find({ owner: req.user._id });
    // console.log(projects);
  }
  return res.json(projects);
});

app.patch("/project/:id/title", decodeIDToken, async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, { title: req.body.title });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
