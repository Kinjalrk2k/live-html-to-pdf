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

app.get("/project/:id", async (req, res) => {
  const { id } = req.params;

  console.log("Getting project ID", id);
  const project = await Project.findById(id).populate("owner");

  res.json(project);
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

app.get("/projects", decodeIDToken, async (req, res) => {
  let projects = [];
  if (req.user) {
    console.log("Owner:", req.user._id);
    projects = await Project.find({ owner: req.user._id });
    console.log(projects);
  }
  return res.json(projects);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
