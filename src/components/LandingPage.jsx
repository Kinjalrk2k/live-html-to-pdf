import { useHistory } from "react-router-dom";
import server from "../api/server";
import pdfIcon from "../assets/pdf-icon.png";
import { AuthContext } from "../contexts/Auth.context";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

import { Button, Container, Row, Card, Spinner, Alert } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

function LandingPage() {
  const history = useHistory();
  const { signInContext, signOutContext, isSignedIn, getCurrentUserIdToken } =
    useContext(AuthContext);
  const { setOwner } = useContext(HtmlPdfContext);

  const [projects, setProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(false);
  const [creating, setCreating] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleModalOpen = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  const modalSetAndOpen = (data) => {
    setModalData(data);
    handleModalOpen();
  };

  useEffect(() => {
    (async () => {
      setFetchingProjects(true);
      const token = await getCurrentUserIdToken();

      const res = await server.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(res.data);
      setFetchingProjects(false);
    })();
  }, [isSignedIn, getCurrentUserIdToken]);

  const createNewProject = async () => {
    setCreating(true);
    const token = await getCurrentUserIdToken();

    const res = await server.get("/new", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { projectId, owner } = res.data;

    setOwner(owner);
    history.push(`/p/${projectId}`);
    setCreating(false);
  };

  const renderProjects = () => {
    if (!isSignedIn) {
      return (
        <div style={{ marginTop: "2rem" }}>
          <Alert variant="warning">Sign In to see your projects!</Alert>
        </div>
      );
    }

    if (fetchingProjects) {
      return (
        <div style={{ marginTop: "2rem" }}>
          Loading projects{" "}
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Please stand by!
        </div>
      );
    }

    if (projects.length === 0) {
      return <div style={{ marginTop: "2rem" }}>No projects found!</div>;
    }

    return projects.map((project, idx) => {
      return (
        <Card key={project._id} style={{ width: "18rem", marginTop: "2rem" }}>
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {project._id}
            </Card.Subtitle>

            {/* <Card.Link href={`/p/${project._id}`}>Open project</Card.Link> */}
            <Button href={`/p/${project._id}`} variant="primary">
              Open
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => modalSetAndOpen(project)}
            >
              Delete
            </Button>
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
          <Button variant="primary" size="lg" onClick={createNewProject}>
            {creating ? (
              <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Create NEW project"
            )}
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
          paddingBottom: "1rem",
        }}
      >
        {renderProjects()}
      </Container>
      <DeleteModal
        show={modalShow}
        data={modalData}
        handleClose={handleModalClose}
      />
    </div>
  );
}

export default LandingPage;
