import { Modal, Button } from "react-bootstrap";
import server from "../api/server";
import { AuthContext } from "../contexts/Auth.context";
import { useContext, useState } from "react";

const DeleteModal = ({ show, data, handleClose }) => {
  const { getCurrentUserIdToken } = useContext(AuthContext);

  const handleDelete = async () => {
    const token = await getCurrentUserIdToken();

    const res = await server.delete(`/project/${data._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ready to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure, you want to delete{" "}
        <strong>
          {data.title} ({data._id})
        </strong>
        ? This action cannot be undone!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
