import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ListenPart2.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import QuestionForm from "../components/QuestionForm";
import NotificationModal from "../components/NotificationModal";

function ReadPart2({ flag, index, complete, item }) {
  const [script, setScript] = useState(item?.Explain?.script || "");
  const [tip, setTip] = useState(item?.Explain?.tip || "");
  const [translation, setTranslation] = useState(
    item?.Explain?.translate || ""
  );
  const [number, setNumber] = useState(
    item?.Question || [
      {
        Q: "",
        A: [
          { script: "", status: false },
          { script: "", status: false },
          { script: "", status: false },
          { script: "", status: false },
        ],
      },
    ]
  );
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const handleAnswerChange = (key, i) => {
    let list = number.slice();
    for (let j = 0; j < 4; j++) {
      if (j === i) {
        list[key].A[j].status = true;
      } else {
        list[key].A[j].status = false;
      }
    }
    setNumber(list);
  };

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    let quantityError = "";

    const hasEmptyQ = number.some((item) => item.Q == "");
    const hasEmptyScript = number.some((item) =>
      item.A.some((answer) => answer.script == "")
    );
    const hasNoTrueAnswer = number.some((question) => {
      return !question.A.some((answer) => answer.status);
    });
    if (hasEmptyQ || hasEmptyScript || hasNoTrueAnswer) {
      errorFields.push("Questions and Answers");
    }

    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (number.length != 4)
      quantityError = "The number of questions in this part must be 4!";
    if (
      errorFields.length > 0 ||
      number.length != 4 ||
      hasEmptyQ ||
      hasEmptyScript ||
      hasNoTrueAnswer
    ) {
      setErrors(inputError + quantityError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    let correct = [];
    for (let i = 0; i < number.length; i++) {
      for (let j = 0; j < 4; j++) {
        if (number[i].A[j].status) correct.push(j);
      }
    }
    if (flag === "submit") {
      let data = {
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
        Order: await api.countQuestion("ReadPart2"),
      };
      await api.addQuestion("ReadPart2", data);
      setTip("");
      setTranslation("");
      setScript("");
      setNumber([
        {
          Q: "",
          A: [
            { script: "", status: false },
            { script: "", status: false },
            { script: "", status: false },
            { script: "", status: false },
          ],
        },
      ]);
      setErrors("");
      setShowNoti(true);
    } else if (flag === "Test") {
      let data = {
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
      };
      setErrors("");
      setShowNoti(true);
      complete(data);
    } else if (flag === "fix") {
      let data = {
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
      };
      setErrors("");
      setShowNoti(true);
      complete(data);
    }
  };

  return (
    <div className="addQuestion">
      {flag == "submit" ? (
        <h2>Add Question Reading Part 2</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}
      {flag === "see" && (
        <>
          <label>Questions:</label>
          {item?.Question?.map((each, key) => {
            return <QuestionForm index={key} item={each} flag={"see"} />;
          })}
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
          <label>Questions:</label>
          <button
            onClick={() => {
              let list = number.slice();
              list.push({
                Q: "",
                A: [
                  { script: "", status: false },
                  { script: "", status: false },
                  { script: "", status: false },
                  { script: "", status: false },
                ],
              });
              setNumber(list);
            }}
            style={{ marginLeft: 10, borderRadius: 5 }}
          >
            Add question
          </button>
          {number.map((each, key) => {
            return (
              <QuestionForm
                index={key}
                item={each}
                handleAnswerChange={(i) => handleAnswerChange(key, i)}
                questionText={(t) => {
                  let list = number.slice();
                  list[key].Q = t;
                  setNumber(list);
                }}
                answerText={(i, t) => {
                  let list = number.slice();
                  list[key].A[i].script = t;
                  setNumber(list);
                }}
                deleteSelf={(j) => {
                  let list = number.slice();
                  list.splice(j, 1);
                  setNumber(list);
                }}
              />
            );
          })}

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

export default ReadPart2;
