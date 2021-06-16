import { useContext, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Spinner,
  FormControl,
  Form,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function MyNavbar() {
  const {
    projectId,
    template,
    data,
    options,
    owner,
    setOwner,
    title,
    setTitle,
  } = useContext(HtmlPdfContext);
  const {
    user,
    signInContext,
    signOutContext,
    isSignedIn,
    getCurrentUserIdToken,
  } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [titleChanging, setTitleChanging] = useState(false);
  const history = useHistory();

  const saveProject = async () => {
    setSaving(true);
    console.log(projectId);

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

  const forkProject = async () => {
    setSaving(true);

    const token = await getCurrentUserIdToken();
    const res = await server.get(`/fork/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOwner(res.data.owner);
    history.push(`/p/${res.data.projectId}`);
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
        <Button variant="secondary" onClick={forkProject}>
          Fork
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

  const titleChange = async (e) => {
    e.preventDefault();
    setTitleChanging(true);
    setTitle(e.target[0].value);

    const token = await getCurrentUserIdToken();
    const res = await server.patch(
      `/project/${projectId}/title`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitleChanging(false);
  };

  // console.log("Owner", owner);
  // console.log("User", user);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Live HTML to PDF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form inline onSubmit={titleChange}>
          <FormControl
            type="text"
            placeholder="Title"
            className="mr-sm-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={
              !(owner === undefined || (isSignedIn && owner.uid === user.uid))
            }
          />
          <Button
            variant="warning"
            type="submit"
            disabled={
              !(owner === undefined || (isSignedIn && owner.uid === user.uid))
            }
          >
            {titleChanging ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Rename"
            )}
          </Button>
        </Form>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {renderSave()}
            <div className="ml-3">{renderSignIn()}</div>
            {/* <Navbar.Text>Made with ❤ by Kinjal Raykarmakar</Navbar.Text> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
