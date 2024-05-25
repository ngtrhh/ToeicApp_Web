import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import NotificationModal from "../components/NotificationModal";

function WritePart2({ item, complete, flag, index }) {
  const [direction, setDirection] = useState(item?.Direction || "");
  const [question, setQuestion] = useState(item?.Question || "");
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ""
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || "");
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    if (direction == "") {
      errorFields.push("Direction");
    }
    if (question == "") {
      errorFields.push("Question");
    }
    if (errorFields.length > 0) {
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
      setErrors(inputError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;

    if (flag === "submit") {
      let data = {
        Direction: direction,
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
        Order: await api.countQuestion("WritePart2"),
      };

      await api.addQuestion("WritePart2", data);
      setDirection("");
      setQuestion("");
      setTip("");
      setSampleAnswer("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "fix") {
      let data = {
        Direction: direction,
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
      };
      setErrors("");
      setShowNoti(true);
      complete(data);
    }
  };

  return (
    <div className="addQuestion">
      {flag == "submit" ? (
        <h2>Add Question Writing Part 2</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}

      {flag === "see" && (
        <>
          <div className="flex-column">
            <div>
              Direction:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  type="text"
                  value={item.Direction}
                  onChange={(e) => setDirection(e.target.value)}
                  rows="2"
                />
              </label>
            </div>
            <div>
              Question:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  type="text"
                  value={item.Question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="7"
                />
              </label>
            </div>
            <div>
              Sample Answer:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.SampleAnswer}
                  onChange={(e) => setSampleAnswer(e.target.value)}
                  rows="7"
                />
              </label>
            </div>
            <div>
              Tips:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.Tips}
                  onChange={(e) => setTip(e.target.value)}
                  rows="3"
                />
              </label>
            </div>
          </div>
        </>
      )}
      {flag !== "see" && (
        <>
          <div className="flex-column">
            <div>
              Direction:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  type="text"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  rows="2"
                />
              </label>
            </div>
            <div>
              Question:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="7"
                />
              </label>
            </div>
            <div>
              Sample Answer:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={sampleAnswer}
                  onChange={(e) => setSampleAnswer(e.target.value)}
                  rows="7"
                />
              </label>
            </div>
            <div>
              Tips:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  rows="3"
                />
              </label>
            </div>
          </div>
        </>
      )}

      {errors && <div className="error">{errors}</div>}

      {flag === "submit" && (
        <button
          type="button"
          className="btn btn-light"
          style={{ backgroundColor: "#F88C19", color: "#fff" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {flag === "fix" && (
        <button
          type="button"
          className="btn btn-light"
          style={{ backgroundColor: "#F88C19", color: "#fff" }}
          onClick={handleSubmit}
        >
          Update
        </button>
      )}

      {flag === "submit" && (
        <NotificationModal
          show={showNoti}
          onHide={() => setShowNoti(false)}
          title="Success!"
          message="Question added sucessfully!"
        />
      )}
      {flag === "fix" && (
        <NotificationModal
          show={showNoti}
          onHide={() => setShowNoti(false)}
          title="Success!"
          message="Question updated sucessfully!"
        />
      )}
    </div>
  );
}

export default WritePart2;
