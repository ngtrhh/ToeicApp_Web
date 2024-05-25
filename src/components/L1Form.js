import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

const L1Form = ({ item, eye, pen, Delete }) => {
  return (
    <Card className="question-item" style={{ width: 200, padding: 10 }}>
      <Card.Img
        variant="top"
        src={
          item.Image
            ? item.Image
            : item.Picture
            ? item.Picture
            : "https://cdn3.emoji.gg/emojis/8014_green_question.png"
        }
        alt={`Question ${item.id}`}
        style={{ height: 170, objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          Question {item.Order}
        </Card.Title>
        <div className="d-flex justify-content-evenly">
          <FontAwesomeIcon icon={faEye} onClick={eye} color="green" />
          <FontAwesomeIcon icon={faPen} onClick={pen} color="green" />
          <FontAwesomeIcon icon={faTrash} onClick={Delete} color="green" />
        </div>
      </Card.Body>
    </Card>
  );
};
export default L1Form;
