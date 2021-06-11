import { useContext, useState } from "react";
import { Container, Navbar, Nav, Button, Spinner } from "react-bootstrap";
import server from "../api/server";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function MyNavbar() {
  const { projectId, template, data, options } = useContext(HtmlPdfContext);
  const [saving, setSaving] = useState(false);

  const saveProject = async () => {
    setSaving(true);
    const res = await server.post(`/project/${projectId}`, {
      template,
      data,
      options,
    });
    setSaving(false);
  };

  const renderSave = () => {
    if (saving) {
      return (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Saving...
        </>
      );
    }

    return "Save Project";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Live HTML to PDF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Button onClick={saveProject}>{renderSave()}</Button>
            {/* <Navbar.Text>Made with ❤ by Kinjal Raykarmakar</Navbar.Text> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
