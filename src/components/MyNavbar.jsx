import { useEffect } from "react";
import { useContext, useState } from "react";
import { Container, Navbar, Nav, Button, Spinner } from "react-bootstrap";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function MyNavbar() {
  const { projectId, template, data, options, owner, setOwner } =
    useContext(HtmlPdfContext);
  const [saving, setSaving] = useState(false);
  const {
    user,
    signInContext,
    signOutContext,
    isSignedIn,
    getCurrentUserIdToken,
  } = useContext(AuthContext);

  const saveProject = async () => {
    setSaving(true);
    const token = await getCurrentUserIdToken();
    const res = await server.post(
      `/project/${projectId}`,
      {
        template,
        data,
        options,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOwner(res.data.owner);
    setSaving(false);
  };

  const renderSave = () => {
    if (isSignedIn !== true) {
      return (
        <Button variant="secondary" disabled>
          Sign in to Save
        </Button>
      );
    }

    if (saving) {
      return (
        <Button>
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

    // console.log("Owner", owner);
    // console.log("User", user);
    // if (owner === null) {
    //   return <Button onClick={saveProject}>NULL OWNER</Button>;
    // }
    if (owner === undefined || owner.uid === user.uid) {
      return <Button onClick={saveProject}>Save Project</Button>;
    } else {
      return (
        <Button variant="secondary" disabled>
          You dont own this project!
        </Button>
      );
    }
  };

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
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Live HTML to PDF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {renderSave()}
            {renderSignIn()}
            {/* <Navbar.Text>Made with ❤ by Kinjal Raykarmakar</Navbar.Text> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
