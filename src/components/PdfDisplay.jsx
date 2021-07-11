import { useContext, useEffect, useState } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

import { Spinner, Alert } from "react-bootstrap";

import server from "../api/server";

const styles = {
  height: "90vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function PdfDisplay() {
  let { template, options, data } = useContext(HtmlPdfContext);
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await server.post(
          "/pdf",
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
        setError(false);
      } catch (e) {
        setError(true);
        console.log(e.response);
      }
    }, 1000);

    return () => clearTimeout(debounce);
  }, [template, options, data]);

  const render = () => {
    if (error) {
      return (
        <div style={styles}>
          <Alert variant="danger">Opps! Error!</Alert>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div style={styles}>
          <Spinner animation="border" variant="primary" size="xl" />
        </div>
      );
    }

    return (
      <object style={styles} data={file} type="application/pdf">
        Output PDF
      </object>
    );
  };

  return <div>{render()}</div>;
}

export default PdfDisplay;
