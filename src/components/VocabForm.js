import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
const VocabForm = ({ item, eye, pen, Delete }) => {
  return (
    <div
      style={{
        width: 350,
        height: 50,
        backgroundColor: "#E8E8E8",
        marginTop: 5,
        display: "flex",
      }}
    >
      <h3 style={{ margin: "auto", marginLeft: 5 }}>{item.Vocab}</h3>
      <div style={{ flex: 1 }} />
      <FontAwesomeIcon
        icon={faEye}
        onClick={eye}
        color="green"
        className="Qicon"
      />
      <FontAwesomeIcon
        icon={faPen}
        onClick={pen}
        color="green"
        className="Qicon"
      />
      <FontAwesomeIcon
        icon={faTrash}
        onClick={Delete}
        color="green"
        className="Qicon"
      />
    </div>
  );
};
export default VocabForm;
