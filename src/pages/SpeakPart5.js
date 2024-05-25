import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import NotificationModal from "../components/NotificationModal";

function SpeakPart5({ item, complete, flag, index }) {
  const [translation, setTranslation] = useState(
    item?.Explain?.Translation || ""
  );
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
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
        },
        Order: await api.countQuestion("SpeakPart5"),
      };
      //console.log(data);

      // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);

      await api.addQuestion("SpeakPart5", data);
      setQuestion("");
      setTip("");
      setTranslation("");
      setSampleAnswer("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "fix") {
      let data = {
        Question: question,
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
        <h2>Add Question Speaking Part 5</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}

      {flag === "see" && (
        <>
          <div className="flex-column">
            <div>
              Question:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="3"
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
                  rows="8"
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
                  rows="4"
                />
              </label>
            </div>
            <div>
              Translation:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={item.Explain.Translation}
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
          <div className="flex-column">
            <div>
              Question:
              <label style={{ display: "flex" }}>
                <textarea
                  className="customInput"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="3"
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
                  rows="8"
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

export default SpeakPart5;
