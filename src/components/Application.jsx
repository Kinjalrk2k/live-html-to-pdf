import Template from "./Template";
import Options from "./Options";
import Data from "./Data";
import PdfDisplay from "./PdfDisplay";

import { Container, Row, Tab, Tabs, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { useContext, useEffect } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";
import { AuthContext } from "../contexts/Auth.context";

function Application(props) {
  const { setProjectId, owner } = useContext(HtmlPdfContext);
  const { isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    setProjectId(props.match.params.id);
  });

  if (owner === null || isSignedIn === null) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <MyNavbar />
      <Container fluid>
        <Row>
          <Col>
            <Tabs defaultActiveKey="template" styles={{ height: "90vh" }}>
              <Tab eventKey="template" title="Template">
                <Template />
              </Tab>
              <Tab eventKey="options" title="Options">
                <Options />
              </Tab>
              <Tab eventKey="data" title="Data">
                <Data />
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <PdfDisplay />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Application;
