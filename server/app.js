const express = require("express");
const Handlebars = require("handlebars");
// const pdf = require("html-pdf");
const pdf = require("pdf-creator-node");

const app = express();

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ app: "Live HTML to PDF", developer: "Kinjal Raykarmakar" });
});

app.post("/pdf", async (req, res) => {
  let { template, options, data } = req.body;
  // console.log(__dirname + "/node_modules/phantomjs-prebuilt/bin/phantomjs");

  try {
    options = JSON.parse(options);
    data = JSON.parse(data);

    // options = {
    //   ...options,
    //   phantomPath: __dirname + "/node_modules/phantomjs-prebuilt/bin/phantomjs",
    // };

    // const html = Handlebars.compile(template)(data);
    // console.log(html);

    // pdf.create(html, options).toFile("./output.pdf", (err, file) => {
    //   console.log("Buffer", file);
    // });

    const document = {
      html: template,
      data,
      path: "./output.pdf",
      type: "",
    };

    pdf.create(document, options).then((file) => {
      console.log(file.filename);
      res.sendFile(file.filename);
    });
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
