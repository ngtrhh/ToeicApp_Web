import React from "react";
import "../styles/Test.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
function TestItem({ item, eyeClick, penClick, trashClick }) {
  return (
    <Card className="testitem question-item">
      <div className="testitem-wrapper">
        <div className="text-dark">
          <h2>{item.Name}</h2>
          <div>
            <span className="testitem-info">
              120 minutes | 7 parts | 200 questions
            </span>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }} />
            <FontAwesomeIcon
              icon={faEye}
              onClick={eyeClick}
              className="Qicon"
            />
            <FontAwesomeIcon
              icon={faPen}
              onClick={penClick}
              className="Qicon"
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={trashClick}
              className="Qicon"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TestItem;
