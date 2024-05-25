import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Questions.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import NotificationModal from "../components/NotificationModal";

function SpeakPart3({ item, complete, flag, index }) {
  const [translation, setTranslation] = useState(
    item?.Explain?.Translation || ["", "", "", ""]
  );
  const [context, setContext] = useState(item?.Context || "");
  const [question, setQuestion] = useState(item?.Question || ["", "", ""]);
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ["", "", ""]
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || ["", "", ""]);
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const handleSetQuestion = (i, t) => {
    let list = question.slice();
    list[i] = t;
    setQuestion(list);
  };

  const handleSetTrans = (i, t) => {
    let list = translation.slice();
    list[i] = t;
    setTranslation(list);
  };
  const handleSetSample = (i, t) => {
    let list = sampleAnswer.slice();
    list[i] = t;
    setSampleAnswer(list);
  };
  const handleSetTips = (i, t) => {
    let list = tip.slice();
    list[i] = t;
    setTip(list);
  };

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    if (context == "") {
      errorFields.push("Context");
    }
    if (question[0] == "" || question[1] == "" || question[2] == "") {
      errorFields.push("Questions");
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
        Question: question,
        Context: context,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
        },
        Order: await api.countQuestion("SpeakPart3"),
      };

      await api.addQuestion("SpeakPart3", data);
      setContext("");
      setQuestion(["", "", ""]);
      setTip(["", "", ""]);
      setTranslation(["", "", "", ""]);
      setSampleAnswer(["", "", ""]);
      setErrors("");
      setShowNoti(true);
    } else if (flag === "fix") {
      let data = {
        Question: question,
        Context: context,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
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
        <h2>Add Question Speaking Part 3</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}

      {flag === "see" && (
        <>
          <div>
            Context:
            <textarea
              className="customInput"
              value={item.Context}
              onChange={(e) => setContext(e.target.value)}
              rows="3"
            />
          </div>
          <div style={{ display: "grid" }}>
            Questions:
            <div
              style={{
                backgroundColor: "#f8f8f8",
                display: "grid",
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(0, e.target.value);
                  }}
                  value={item?.Question[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(1, e.target.value);
                  }}
                  value={item?.Question[1]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(2, e.target.value);
                  }}
                  value={item?.Question[2]}
                  id="TR"
                ></input>
              </div>
            </div>
          </div>

          <div>
            <div>
              Context Translation:
              <textarea
                className="customInput"
                value={item.Explain.Translation[0]}
                onChange={(e) => handleSetTrans(0, e.target.value)}
                rows="3"
              />
            </div>
            <div>
              Question Tranlation:
              <div
                style={{
                  display: "grid",
                  backgroundColor: "#f8f8f8",
                  marginTop: 5,
                  padding: 10,
                  borderRadius: 10,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>1/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(1, e.target.value);
                    }}
                    value={item.Explain.Translation[1]}
                    id="TR"
                  ></input>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>2/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(2, e.target.value);
                    }}
                    value={item.Explain.Translation[2]}
                    id="TR"
                  ></input>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>3/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(3, e.target.value);
                    }}
                    value={item.Explain.Translation[3]}
                    id="TR"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            Sample Answer:
            <div
              style={{
                display: "grid",
                backgroundColor: "#f8f8f8",
                marginTop: 5,
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(0, e.target.value);
                  }}
                  value={item.Explain.SampleAnswer[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(1, e.target.value);
                  }}
                  value={item.Explain.SampleAnswer[1]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(2, e.target.value);
                  }}
                  value={item.Explain.SampleAnswer[2]}
                  id="TR"
                ></input>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            Tips:
            <div
              style={{
                display: "grid",
                backgroundColor: "#f8f8f8",
                marginTop: 5,
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(0, e.target.value);
                  }}
                  value={item.Explain.Tips[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(1, e.target.value);
                  }}
                  value={item.Explain.Tips[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(2, e.target.value);
                  }}
                  value={item.Explain.Tips[0]}
                  id="TR"
                ></input>
              </div>
            </div>
          </div>
        </>
      )}
      {flag !== "see" && (
        <>
          <div>
            Context:
            <textarea
              className="customInput"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows="3"
            />
          </div>
          <div style={{ display: "grid" }}>
            Questions:
            <div
              style={{
                backgroundColor: "#f8f8f8",
                display: "grid",
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(0, e.target.value);
                  }}
                  value={question[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(1, e.target.value);
                  }}
                  value={question[1]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetQuestion(2, e.target.value);
                  }}
                  value={question[2]}
                  id="TR"
                ></input>
              </div>
            </div>
          </div>

          <div>
            <div>
              Context Translation:
              <textarea
                className="customInput"
                value={translation[0]}
                onChange={(e) => handleSetTrans(0, e.target.value)}
                rows="3"
              />
            </div>
            <div>
              Question Tranlation:
              <div
                style={{
                  display: "grid",
                  backgroundColor: "#f8f8f8",
                  marginTop: 5,
                  padding: 10,
                  borderRadius: 10,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>1/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(1, e.target.value);
                    }}
                    value={translation[1]}
                    id="TR"
                  ></input>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>2/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(2, e.target.value);
                    }}
                    value={translation[2]}
                    id="TR"
                  ></input>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    marginLeft: 5,
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <h5>3/</h5>
                  <input
                    className="customInput"
                    type="text"
                    onChange={(e) => {
                      handleSetTrans(3, e.target.value);
                    }}
                    value={translation[3]}
                    id="TR"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            Sample Answer:
            <div
              style={{
                display: "grid",
                backgroundColor: "#f8f8f8",
                marginTop: 5,
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(0, e.target.value);
                  }}
                  value={sampleAnswer[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(1, e.target.value);
                  }}
                  value={sampleAnswer[1]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetSample(2, e.target.value);
                  }}
                  value={sampleAnswer[2]}
                  id="TR"
                ></input>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            Tips:
            <div
              style={{
                display: "grid",
                backgroundColor: "#f8f8f8",
                marginTop: 5,
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>1/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(0, e.target.value);
                  }}
                  value={tip[0]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <h5>2/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(1, e.target.value);
                  }}
                  value={tip[1]}
                  id="TR"
                ></input>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <h5>3/</h5>
                <input
                  className="customInput"
                  type="text"
                  onChange={(e) => {
                    handleSetTips(2, e.target.value);
                  }}
                  value={tip[2]}
                  id="TR"
                ></input>
              </div>
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

export default SpeakPart3;
