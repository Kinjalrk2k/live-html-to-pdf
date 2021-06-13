import { useHistory } from "react-router-dom";
import server from "../api/server";
import pdfIcon from "../assets/pdf-icon.png";
import { AuthContext } from "../contexts/Auth.context";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

import { Button, Container, Row, Card, Spinner } from "react-bootstrap";

function LandingPage() {
  const history = useHistory();
  const {
    user,
    signInContext,
    signOutContext,
    isSignedIn,
    getCurrentUserIdToken,
  } = useContext(AuthContext);
  const { setOwner } = useContext(HtmlPdfContext);

  const [projects, setProjects] = useState([]);

  const createNewProject = async () => {
    const token = await getCurrentUserIdToken();

    const res = await server.get("/new", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { projectId, owner } = res.data;

    setOwner(owner);
    history.push(`/p/${projectId}`);
  };

  useEffect(() => {
    (async () => {
      const token = await getCurrentUserIdToken();

      const res = await server.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(res.data);
    })();
  }, [isSignedIn]);

  const renderProjects = () => {
    if (projects.length === 0) {
      return <div>No projects found!</div>;
    }
    return projects.map((project, idx) => {
      return (
        <Card key={project._id} style={{ width: "18rem", marginTop: "2rem" }}>
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {project._id}
            </Card.Subtitle>

            <Card.Link href={`/p/${project._id}`}>Open project</Card.Link>
          </Card.Body>
        </Card>
      );
    });
  };

  if (isSignedIn === null) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          style={{ width: "5rem", height: "5rem" }}
          animation="border"
          variant="secondary"
        />
      </div>
    );
  }

  const renderSignIn = () => {
    if (isSignedIn === null) {
      return (
        <Button variant="primary">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </Button>
      );
    }

    if (isSignedIn === true) {
      return (
        <Button variant="danger" onClick={() => signOutContext()}>
          Sign Out
        </Button>
      );
    }

    return (
      <Button variant="success" onClick={() => signInContext()}>
        Sign In
      </Button>
    );
  };

  return (
    <div>
      <Container className="pt-2">
        <Row style={{ justifyContent: "flex-end" }}>{renderSignIn()}</Row>
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "60vh",
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
      <h1 style={{ textAlign: "center" }}>Your Projects</h1>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {renderProjects()}
      </Container>
    </div>
  );
}

export default LandingPage;
