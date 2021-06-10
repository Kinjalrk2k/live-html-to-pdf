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
  template: { type: String, default: defaultTemplate },
  options: { type: String, default: defaultOptions },
  data: { type: String, default: defaultData },
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
