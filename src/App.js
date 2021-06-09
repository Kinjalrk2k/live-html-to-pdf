import Template from "./components/Template";
import Options from "./components/Options";
import Data from "./components/Data";
import PdfDisplay from "./components/PdfDisplay";

import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";
import { Container, Row, Tab, Tabs, Col } from "react-bootstrap";

function App() {
  return (
    <HtmlPdfProvider>
      <div className="App">
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
      </div>
    </HtmlPdfProvider>
  );
}

export default App;
