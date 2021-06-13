import { useEffect } from "react";
import { useContext, useState } from "react";
import { Container, Navbar, Nav, Button, Spinner } from "react-bootstrap";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function MyNavbar() {
  const { projectId, template, data, options } = useContext(HtmlPdfContext);
  const [saving, setSaving] = useState(false);
  const { user, signInContext, signOutContext, isSignedIn } =
    useContext(AuthContext);

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
        </>
      );
    }

    return "Save Project";
  };

  const renderSignIn = () => {
    if (isSignedIn === null) {
      return (
        <Button variant="primary" onClick={() => signOutContext()}>
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
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Live HTML to PDF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Button onClick={saveProject}>{renderSave()}</Button>
            {renderSignIn()}
            {/* <Navbar.Text>Made with ❤ by Kinjal Raykarmakar</Navbar.Text> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
