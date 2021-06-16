import { useContext, useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Spinner,
  Col,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function Forks(props) {
  const {
    projectId,
    setProjectId,
    template,
    setTemplate,
    data,
    setData,
    options,
    setOptions,
    owner,
    setOwner,
    title,
    setTitle,
    forks,
    setForks,
  } = useContext(HtmlPdfContext);
  const {
    user,
    signInContext,
    signOutContext,
    isSignedIn,
    getCurrentUserIdToken,
  } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setProjectId(props.match.params.id);
  });

  const pullProject = async (forkedProjectId) => {
    const token = await getCurrentUserIdToken();
    const res = await server.post(
      `/pull/${projectId}`,
      { forkedProjectId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { template, data, options } = res.data;
    setTemplate(template);
    setData(data);
    setOptions(options);

    history.push(`/p/${projectId}`);
  };

  const renderList = () => {
    return forks.map((fork) => {
      return (
        <ListGroup.Item>
          <Row>
            <Col>
              <Card.Title>{fork.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {fork._id}
              </Card.Subtitle>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                onClick={() => history.push(`/p/${fork._id}`)}
              >
                See the fork
              </Button>
              <Button variant="danger" onClick={() => pullProject(fork._id)}>
                Pull from fork
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">
        Forks of {title} ({projectId})
      </h2>
      <ListGroup>{renderList()}</ListGroup>
    </Container>
  );
}

export default Forks;
