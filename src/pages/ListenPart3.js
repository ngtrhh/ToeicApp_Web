import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ListenPart2.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import QuestionForm from "../components/QuestionForm";
import upload from "../api/upload";
import NotificationModal from "../components/NotificationModal";

function ListenPart3({ flag, index, complete, item }) {
  const [audioFile, setAudioFile] = useState(item?.Audio || null);
  const [audioFile1, setAudioFile1] = useState(null);
  const [script, setScript] = useState(item?.Explain?.script || "");
  const [selectedAnswer, setSelectedAnswer] = useState();
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

  const handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];

    if (selectedAudio) {
      setAudioFile1(selectedAudio);
    } else {
      setAudioFile1(null);
    }
  };

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

  function isAudioUrl(url) {
    try {
      new URL(url);
      const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
      return audioUrlRegex.test(url.toLowerCase());
    } catch (error) {
      return false;
    }
  }

  const validateData = () => {
    let errorFields = [];
    let audioError = "";
    let inputError = "";
    let quantityError = "";
    if (audioFile == null || (audioFile == "" && audioFile1 == null)) {
      errorFields.push("Audio File");
    }

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
    const isAudioValid = audioFile1 != null || isAudioUrl(audioFile);
    if (audioFile != null && audioFile != "" && !isAudioValid)
      audioError = "\nThe audio url link is not valid!";
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (number.length != 3)
      quantityError = "The number of questions in this part must be 3!";
    if (
      errorFields.length > 0 ||
      !isAudioValid ||
      number.length != 3 ||
      hasEmptyQ ||
      hasEmptyScript ||
      hasNoTrueAnswer
    ) {
      setErrors(inputError + audioError + quantityError);
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
    let audio = audioFile;
    if (audioFile1 != null) {
      try {
        const formData = new FormData();
        formData.append("audio", audioFile1);
        const response = await axios.post(upload.upAudio, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        audio = response.data.audio;
        console.log(audio);
      } catch (e) {}
    }
    if (flag === "submit") {
      let data = {
        Audio: audio,
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
        Order: await api.countQuestion("ListenPart3"),
      };
      await api.addQuestion("ListenPart3", data);
      setAudioFile("");
      setAudioFile1(null);
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
        Audio: audio,
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
        Audio: audio,
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
        <h2>Add Question Listening Part 3</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}
      {flag === "see" && (
        <>
          <div className="fileContainer">
            <label>
              Audio:
              <input
                className="customInput"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
              />
              <text style={{ font: 12 }}>or input the link:</text>
              <input
                className="customInput"
                type="url"
                onChange={(e) => setAudioFile(e.target.value)}
                value={item.Audio}
              />
            </label>
          </div>

          <label>Question:</label>
          {item.Question.map((each, key) => {
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
          <div className="fileContainer">
            <label>
              Audio:
              <input
                className="customInput"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
              />
              <text style={{ font: 12 }}>or input the link:</text>
              <input
                className="customInput"
                type="url"
                onChange={(e) => setAudioFile(e.target.value)}
                value={audioFile}
              />
            </label>
          </div>

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

export default ListenPart3;
