import React from "react";
import { Modal, Button } from "react-bootstrap";

const NotificationModal = ({ show, onHide, title, message, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {onConfirm && (
          <Button
            variant="secondary"
            onClick={onConfirm}
            style={{ backgroundColor: "#F88C19" }}
          >
            Ok
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={onHide}
          style={{ backgroundColor: "#5DA110" }}
        >
          {onConfirm ? "Cancel" : "Ok"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
