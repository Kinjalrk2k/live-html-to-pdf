import pdf from "html-pdf";
import Handlebars from "handlebars";
import { useContext, useEffect, useState } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function PdfDisplay() {
  let { template, options, data } = useContext(HtmlPdfContext);
  const [file, setFile] = useState("");

  try {
    options = JSON.parse(options);
    data = JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  console.log(data, options);

  useEffect(async () => {
    try {
      const html = Handlebars.compile(template)(data);
      console.log(html);

      pdf.create(html, options).toBuffer((err, buffer) => {
        console.log("Buffer", buffer);
        // setFile(res);
      });
    } catch (e) {
      console.error(e);
    }
  }, [template, options, data]);

  return <div>PdfDisplay</div>;
}

export default PdfDisplay;
