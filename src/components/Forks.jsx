import { useContext, useEffect } from "react";
import {
  Container,
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function Forks(props) {
  const {
    projectId,
    setProjectId,
    setTemplate,
    setData,
    setOptions,
    title,
    forks,
  } = useContext(HtmlPdfContext);
  const { getCurrentUserIdToken } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setProjectId(props.match.params.id);
    document.title = `Forks of ${title} | Live HTML to PDF`;
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
              <Card.Title>
                {fork.title} <Badge variant="info">{fork._id}</Badge>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                by {fork.owner.name}
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
        Forks of <a href={`/p/${projectId}`}>{title}</a>{" "}
        <Badge variant="warning">{projectId}</Badge>
      </h2>
      <ListGroup>{renderList()}</ListGroup>
    </Container>
  );
}

export default Forks;
