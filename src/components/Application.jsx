import Template from "./Template";
import Options from "./Options";
import Data from "./Data";
import PdfDisplay from "./PdfDisplay";

import { Container, Row, Tab, Tabs, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";

function Application(props) {
  console.log(props.match.params.id);
  return (
    <>
      <MyNavbar />
      <Container fluid>
        <Row>
          <Col>
            <Tabs defaultActiveKey="template" styles={{ height: "90vh" }}>
              <Tab eventKey="template" title="Home">
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
