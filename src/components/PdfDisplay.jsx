import { useContext, useEffect, useState } from "react";

import { HtmlPdfContext } from "../contexts/HtmlPdf.context";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function PdfDisplay() {
  let { template, options, data } = useContext(HtmlPdfContext);
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setIsLoading(true);
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

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [template, options, data]);

  const render = () => {
    if (isLoading) {
      return (
        <div
          style={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" variant="primary" size="xl" />
        </div>
      );
    } else {
      return (
        <object
          style={{ height: "90vh", width: "100%" }}
          data={file}
          type="application/pdf"
        ></object>
      );
    }
  };

  return <div>{render()}</div>;
}

export default PdfDisplay;
