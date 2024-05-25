import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import { Flag } from "@mui/icons-material";
import NotificationModal from "../components/NotificationModal";

import upload from "../api/upload";
function ListenPart1({ flag, index, complete, item }) {
  const [audioFile, setAudioFile] = useState(item?.Audio || "");
  const [imageFile, setImageFile] = useState(item?.Image || "");
  const [audioFile1, setAudioFile1] = useState(null);
  const [imageFile1, setImageFile1] = useState(null);
  const [question, setQuestion] = useState("");
  const trueIndex = item?.Answer?.findIndex((value) => value === true);
  const temp = trueIndex !== -1 ? trueIndex : null;
  const [selectedAnswer, setSelectedAnswer] = useState(temp);
  const [script, setScript] = useState(item?.Explain?.script || "");
  const [tip, setTip] = useState(item?.Explain?.tip || "");
  const [translation, setTranslation] = useState(
    item?.Explain?.translate || ""
  );
  const location = useLocation();
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

  const handleImageChange = (e) => {
    setImageFile1(e.target.files[0]);
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
    if (flag === "update") {
      item.Answer[e] = true;
      for (let i = 0; i < 4; i++) {
        if (i !== e) item.Answer[i] = false;
      }
    }
  };

  function isImageUrl(url) {
    try {
      new URL(url);
      const imageUrlRegex =
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(png|jpg|jpeg|gif)$/i;
      return imageUrlRegex.test(url.toLowerCase());
    } catch (error) {
      return false;
    }
  }

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
    let imgError = "";
    let audioError = "";
    let inputError = "";
    if (audioFile == "" && audioFile1 == null) {
      errorFields.push("Audio File");
    }
    if (imageFile == "" && imageFile1 == null) {
      errorFields.push("Image File");
    }
    if (selectedAnswer == null || selectedAnswer == -1) {
      errorFields.push("Answer");
    }
    const isImgValid = imageFile1 != null || isImageUrl(imageFile);
    const isAudioValid = audioFile1 != null || isAudioUrl(audioFile);
    if (imageFile != "" && !isImgValid)
      imgError = "\nThe image url link is not valid!";
    if (audioFile != "" && !isAudioValid)
      audioError = "\nThe audio url link is not valid!";
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (errorFields.length > 0 || !isImgValid || !isAudioValid) {
      setErrors(inputError + audioError + imgError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    let answerL = [];
    for (let i = 0; i < 4; i++) {
      if (i == selectedAnswer) {
        answerL.push(true);
      } else answerL.push(false);
    }
    let image = imageFile;
    let audio = audioFile;
    if (imageFile1 != null) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile1);
        const response = await axios.post(upload.upImage, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        image = response.data.photo;
        console.log(image);
      } catch (e) {}
    }
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
        Image: image,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order: await api.countQuestion("ListenPart1"),
      };
      await api.addQuestion("ListenPart1", data);
      setAudioFile("");
      setAudioFile1(null);
      setImageFile("");
      setImageFile1(null);
      setSelectedAnswer(null);
      setTip("");
      setTranslation("");
      setScript("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "Test") {
      let data = {
        Audio: audio,
        Image: image,
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
        Audio: audio,
        Image: image,
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
        <h2>Add Question Listening Part 1</h2>
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

            <label>
              Image:
              <input
                className="customInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <text style={{ font: 12 }}>or input the link:</text>
              <input
                className="customInput"
                type="url"
                onChange={(e) => {
                  setImageFile(e.target.value);
                }}
                value={item.Image}
              />
            </label>
          </div>

          <label>Answer:</label>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 0 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(0);
              }}
            >
              A
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 1 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(1);
              }}
            >
              B
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 2 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(2);
              }}
            >
              C
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 3 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(3);
              }}
            >
              D
            </button>
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

            <label>
              Image:
              <input
                className="customInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <text style={{ font: 12 }}>or input the link:</text>
              <input
                className="customInput"
                type="url"
                onChange={(e) => setImageFile(e.target.value)}
                value={imageFile}
              />
            </label>
          </div>

          <label>Answer:</label>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 0 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(0);
              }}
            >
              A
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 1 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(1);
              }}
            >
              B
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 2 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(2);
              }}
            >
              C
            </button>
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: selectedAnswer === 3 && "#5DA110",
                marginRight: 10,
                border: "1px solid black",
              }}
              onClick={() => {
                handleAnswerChange(3);
              }}
            >
              D
            </button>
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

export default ListenPart1;
