import { useContext, useEffect, useState } from "react";

import { HtmlPdfContext } from "../contexts/HtmlPdf.context";
import axios from "axios";

function PdfDisplay() {
  let { template, options, data } = useContext(HtmlPdfContext);
  const [file, setFile] = useState("");

  useEffect(async () => {
    const res = await axios.post(
      "http://localhost:5000/pdf",
      {
        template,
        options,
        data,
      },
      { responseType: "blob" }
    );

    const fileBlob = new Blob([res.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(fileBlob);

    console.log(fileURL);

    setFile(fileURL);
  }, [template, options, data]);

  return (
    <div>
      <object
        style={{ height: "90vh", width: "100%" }}
        data={file}
        type="application/pdf"
      ></object>
    </div>
  );
}

export default PdfDisplay;
