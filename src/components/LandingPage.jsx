import { findByLabelText } from "@testing-library/dom";
import { useHistory } from "react-router-dom";
import server from "../api/server";
import pdfIcon from "../assets/pdf-icon.png";

const { Button, Container, Row } = require("react-bootstrap");

function LandingPage() {
  const history = useHistory();

  const createNewProject = async () => {
    const res = await server.get("/new");
    const { projectId } = res.data;
    history.push(`/p/${projectId}`);
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
        }}
      >
        <Row>
          <h1>
            Live <i>{"<html>"}</i> to{" "}
            <img height="80px" src={pdfIcon} alt="Logo" />
          </h1>
        </Row>
        <Row>
          <Button variant="primary" onClick={createNewProject}>
            Create New Project
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
