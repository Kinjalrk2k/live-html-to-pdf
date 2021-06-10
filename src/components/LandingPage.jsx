import { useHistory } from "react-router-dom";
import api from "../api";

const { Button } = require("react-bootstrap");

function LandingPage() {
  const history = useHistory();

  const createNewProject = async () => {
    const res = await api.get("/new");
    const { projectId } = res.data;
    history.push(`/p/${projectId}`);
  };

  return (
    <div>
      Landing Page!
      <Button variant="success" onClick={createNewProject}>
        Create New Project
      </Button>
    </div>
  );
}

export default LandingPage;
