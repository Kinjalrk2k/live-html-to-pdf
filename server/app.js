const express = require("express");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");
const pdf = require("pdf-creator-node");

require("dotenv/config");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
