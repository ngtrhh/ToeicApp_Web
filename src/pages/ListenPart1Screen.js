import React, { useState, useEffect } from "react";
import "../styles/Vocab.css";
import L1Form from "../components/L1Form";
import api from "../api/Api";
import { useNavigate } from "react-router-dom";

function ListenPart1Screen({ sign, listQ, Remove }) {
  const navigate = useNavigate();
  const [flag, setFlag] = useState("-1");
  const [data, setData] = useState({});
  const [oldSign, setOldSign] = useState(null);

  return (
    <div className="container d-flex flex-column">
      <div className="d-flex align-items-center ms-3 gap-3">
        <div className="fs-5">
          <span className="fw-semibold">Total: </span>
          {listQ && listQ.length}
        </div>
        <button
          type="button"
          className="btn btn-light bg-secondary  text-white"
          onClick={() => {
            navigate("/QuestionPage", {
              state: { sign: sign, flag: "submit" },
            });
          }}
        >
          Add Question
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 g-4">
        {listQ?.map((each, key) => (
          <div className="col col-sm-5 col-md-4" key={key}>
            <L1Form
              eye={() => {
                setFlag("see");
                setData(each);
                setOldSign(sign);
                navigate("/QuestionPage", {
                  state: { sign: sign, item: each, flag: "see", index: key },
                });
              }}
              pen={() => {
                navigate("/QuestionPage", {
                  state: { sign: sign, item: each, flag: "fix", index: key },
                });
              }}
              Delete={() => {
                Remove(key, each.Id);
              }}
              item={each}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListenPart1Screen;
