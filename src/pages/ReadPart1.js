import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import NotificationModal from "../components/NotificationModal";

function ReadPart1({ flag, index, complete, item }) {
  const [question, setQuestion] = useState(item?.Question || "");
  const [selectedAnswer, setSelectedAnswer] = useState(
    item?.Answer?.findIndex(function (item1) {
      return item1.status === true;
    }) ||
      (item && item.Answer)
      ? 0
      : null
  );
  const [script, setScript] = useState(item?.Explain?.script || "");
  const [tip, setTip] = useState(item?.Explain?.tip || "");
  const [translation, setTranslation] = useState(
    item?.Explain?.translate || ""
  );
  const [textR1, setTextR1] = useState(
    item && item.Answer ? item.Answer[0]?.script : ""
  );
  const [textR2, setTextR2] = useState(
    item && item.Answer ? item.Answer[1]?.script : ""
  );
  const [textR3, setTextR3] = useState(
    item && item.Answer ? item.Answer[2]?.script : ""
  );
  const [textR4, setTextR4] = useState(
    item && item.Answer ? item.Answer[3]?.script : ""
  );
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
  };

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    if (question == "") {
      errorFields.push("Question");
    }
    if (
      selectedAnswer == null ||
      selectedAnswer == -1 ||
      textR1 == "" ||
      textR2 == "" ||
      textR3 == "" ||
      textR4 == ""
    ) {
      errorFields.push("Answer");
    }
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (errorFields.length > 0) {
      setErrors(inputError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    let answerL = [];
    let text = [textR1, textR2, textR3, textR4];
    for (let i = 0; i < 4; i++) {
      if (i == selectedAnswer) {
        answerL.push({
          status: true,
          script: text[i],
        });
      } else
        answerL.push({
          status: false,
          script: text[i],
        });
    }

    if (flag === "submit") {
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order: await api.countQuestion("ReadPart1"),
      };
      console.log(data);
      await api.addQuestion("ReadPart1", data);
      setQuestion("");
      setSelectedAnswer(null);
      setTextR1("");
      setTextR2("");
      setTextR3("");
      setTextR4("");
      setTip("");
      setTranslation("");
      setScript("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "Test") {
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      };
      setErrors("");
      setShowNoti(true);
      complete(data);
    } else if (flag === "fix") {
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
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
        <h2>Add Question Reading Part 1</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}
      {flag === "see" && (
        <>
          <div>
            Question:
            <textarea
              className="customInput"
              value={item.Question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="2"
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10, display: "grid" }}>
            <label>Answer:</label>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: item.Answer[0].status && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(0);
                }}
              >
                A
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR1(e.target.value)}
                value={item.Answer[0].script}
                id="TR"
              ></input>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: item.Answer[1].status && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(1);
                }}
              >
                B
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR2(e.target.value)}
                value={item.Answer[1].script}
                id="TR"
              ></input>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: item.Answer[2].status && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(2);
                }}
              >
                C
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR3(e.target.value)}
                value={item.Answer[2].script}
                id="TR"
              ></input>
            </div>
            {item.Answer[3] && (
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginBottom: 10,
                }}
              >
                <button
                  className="btn rounded-circle"
                  style={{
                    backgroundColor: item.Answer[3].status && "#5DA110",
                    marginRight: 10,
                    border: "1px solid black",
                    height: 40,
                  }}
                  onClick={() => {
                    handleAnswerChange(2);
                  }}
                >
                  D
                </button>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => setTextR4(e.target.value)}
                  value={item.Answer[3].script}
                  id="TR"
                ></input>
              </div>
            )}
          </div>

          <div className="flex-column">
            <div>
              Script:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.script}
                  onChange={(e) => setScript(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
            <div>
              Tip:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.tip}
                  onChange={(e) => setTip(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
            <div>
              Translation:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.translate}
                  onChange={(e) => setTranslation(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
          </div>
        </>
      )}

      {flag !== "see" && (
        <>
          <div>
            Question:
            <textarea
              className="customInput"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="2"
            />
          </div>

          <div style={{ marginTop: 10, marginBottom: 10, display: "grid" }}>
            <label>Answer:</label>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: selectedAnswer === 0 && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(0);
                }}
              >
                A
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR1(e.target.value)}
                value={textR1}
                id="TR"
              ></input>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: selectedAnswer === 1 && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(1);
                }}
              >
                B
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR2(e.target.value)}
                value={textR2}
                id="TR"
              ></input>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: selectedAnswer === 2 && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(2);
                }}
              >
                C
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR3(e.target.value)}
                value={textR3}
                id="TR"
              ></input>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: selectedAnswer === 3 && "#5DA110",
                  marginRight: 10,
                  border: "1px solid black",
                  height: 40,
                }}
                onClick={() => {
                  handleAnswerChange(3);
                }}
              >
                D
              </button>
              <input
                className="customInput"
                type="text"
                onChange={(e) => setTextR4(e.target.value)}
                value={textR4}
                id="TR"
              ></input>
            </div>
          </div>

          <div className="flex-column">
            <div>
              Script:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
            <div>
              Tip:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
            <div>
              Translation:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  rows="4"
                />
              </label>
            </div>
          </div>
        </>
      )}

      {errors && <div className="error">{errors}</div>}

      {flag === "Test" && (
        <button
          type="button"
          className="btn btn-light"
          style={{ backgroundColor: "#F88C19", color: "#fff" }}
          onClick={handleSubmit}
        >
          Add
        </button>
      )}
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

export default ReadPart1;
