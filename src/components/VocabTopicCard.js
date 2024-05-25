import React from "react";
import { Card } from "react-bootstrap";
import "../styles/Vocab.css";

const VocabTopicCard = ({ item, viewTopic, deleteTopic }) => {
  return (
    <Card className="question-item col p-3">
      <Card.Img
        variant="top"
        src={item?.Image}
        alt={"Topic Image"}
        style={{
          height: 140,
          width: "auto",
          objectFit: "contain",
          alignSelf: "center",
        }}
      />
      <Card.Body>
        <h5 className="text-center fw-semibold">{item?.Topic}</h5>
        <h6 className="text-center">{"Quantity: " + item?.VocabQuantity}</h6>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light bg-success text-white w-50"
            onClick={() => viewTopic(item)}
          >
            Detail
          </button>
          <button
            type="button"
            className="btn btn-light bg-success text-white w-50"
            onClick={() => deleteTopic(item)}
          >
            Delete
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default VocabTopicCard;
