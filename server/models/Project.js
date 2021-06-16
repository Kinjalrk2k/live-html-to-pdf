const mongoose = require("mongoose");

const defaultOptions = JSON.stringify(
  {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
  },
  null,
  2
);

const defaultTemplate = `<html>
  <h1>{{msg}}</h1>
</html>
`;

const defaultData = JSON.stringify(
  {
    msg: "Hello, World!",
  },
  null,
  2
);

const ProjectSchema = new mongoose.Schema({
  // projectId: String,
  title: { type: String, default: "Untitled Project" },
  template: { type: String, default: defaultTemplate },
  options: { type: String, default: defaultOptions },
  data: { type: String, default: defaultData },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  forked: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
