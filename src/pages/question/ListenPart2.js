import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Button, IconButton, TextField } from "@mui/material";
import NotificationModal from "../../components/NotificationModal";
import upload from "../../api/upload";
import api from "../../api/Api";
import "../../styles/DetailListen.css";

function ListenPart2({ flag, index, complete, item }) {
  const [audioFile, setAudioFile] = useState(item?.Audio || null);
  const [audioFile1, setAudioFile1] = useState(null);
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

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
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
    if (audioFile == null || (audioFile === "" && audioFile1 === null)) {
      errorFields.push("Audio File");
    }
    if (
      selectedAnswer === null ||
      selectedAnswer === -1 ||
      textR1 === "" ||
      textR2 === "" ||
      textR3 === ""
    ) {
      errorFields.push("Answer");
    }
    const isAudioValid = audioFile1 !== null || isAudioUrl(audioFile);
    if (audioFile !== null && audioFile !== "" && !isAudioValid)
      audioError = "\nThe audio url link is not valid!";
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (errorFields.length > 0 || !isAudioValid) {
      setErrors(inputError + audioError);
      return false;
    } else return true;
  };
  console.log(item);

  const handleSubmit = async () => {
    if (!validateData()) return;
    let answerL = [];
    let text = [textR1, textR2, textR3];
    for (let i = 0; i < 3; i++) {
      if (i === selectedAnswer) {
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
    let audio = audioFile;
    if (audioFile1 !== null) {
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
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order: await api.countQuestion("ListenPart2"),
      };
      await api.addQuestion("ListenPart2", data);
      setAudioFile("");
      setAudioFile1(null);
      setSelectedAnswer(null);
      setTextR1("");
      setTextR2("");
      setTextR3("");
      setTip("");
      setTranslation("");
      setScript("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "edit") {
      let data = {
        Audio: audio,
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
    } else if (flag === "test") {
      let data = {
        Audio: audio,
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
    <div className="d-flex p-4 flex-column">
      <h2>
        {flag === "submit"
          ? "Add Question Listening Part 2"
          : `Question ${item.Order}`}
      </h2>
      {flag !== "view" ? (
        <div className="d-flex flex-column gap-4">
          <div className="muiInput">
            <label className="muiLabel">Audio</label>
            <input type="file" accept="audio/*" onChange={handleAudioChange} />
          </div>

          <TextField
            label="or input the link"
            type="url"
            value={audioFile}
            onChange={(e) => setAudioFile(e.target.value)}
          />

          <div>Answer:</div>
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-4 align-items-center">
              <IconButton
                className={clsx(
                  "border border-black fs-6 rounded-circle",
                  selectedAnswer === 0 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
                onClick={() => handleAnswerChange(0)}
              >
                A
              </IconButton>
              <TextField
                className="w-100"
                type="text"
                value={textR1}
                size="small"
                onChange={(e) => setTextR1(e.target.value)}
              />
            </div>
            <div className="d-flex gap-4 align-items-center">
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  selectedAnswer === 1 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
                onClick={() => handleAnswerChange(1)}
              >
                B
              </IconButton>
              <TextField
                className="w-100"
                type="text"
                value={textR2}
                size="small"
                onChange={(e) => setTextR2(e.target.value)}
              />
            </div>
            <div className="d-flex gap-4 align-items-center">
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  selectedAnswer === 2 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
                onClick={() => handleAnswerChange(2)}
              >
                C
              </IconButton>
              <TextField
                className="w-100"
                type="text"
                value={textR3}
                size="small"
                onChange={(e) => setTextR3(e.target.value)}
              />
            </div>
          </div>

          <TextField
            multiline
            label="Script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            rows="4"
          />

          <TextField
            multiline
            label="Tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            rows="4"
          />

          <TextField
            multiline
            label="Translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            rows="4"
          />
        </div>
      ) : (
        flag === "view" && (
          <div className="d-flex flex-column gap-4">
            <div className="muiInput">
              <label className="muiLabel">Audio</label>
              <input type="file" accept="audio/*" className="disabled" />
            </div>

            <TextField
              label="or input the link"
              type="url"
              value={item.Audio}
            />

            <div>Answer:</div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-4 align-items-center">
                <IconButton
                  className={clsx(
                    "border border-black fs-6 rounded-circle",
                    selectedAnswer === 0 ? "bg-primary" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                >
                  A
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Answer[0].script}
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <IconButton
                  className={clsx(
                    "border border-black fs-6 py-1 rounded-circle",
                    selectedAnswer === 1 ? "bg-primary" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                >
                  B
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Answer[1].script}
                  size="small"
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <IconButton
                  className={clsx(
                    "border border-black fs-6 py-1 rounded-circle",
                    selectedAnswer === 2 ? "bg-primary" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                >
                  C
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  size="small"
                  value={item.Answer[2].script}
                />
              </div>
            </div>

            <TextField
              multiline
              label="Script"
              value={item.Explain.script}
              rows="4"
            />

            <TextField
              multiline
              label="Tip"
              value={item.Explain.tip}
              rows="4"
            />

            <TextField
              multiline
              label="Translation"
              value={item.Explain.translate}
              rows="4"
            />
          </div>
        )
      )}

      {errors && <div className="error">{errors}</div>}

      {flag === "test" ? (
        <Button
          className="bg-secondary text-white w-100 mt-4"
          onClick={handleSubmit}
        >
          Add
        </Button>
      ) : flag === "edit" ? (
        <div div className="mt-4">
          <Button
            className="bg-secondary text-white w-100"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <NotificationModal
            show={showNoti}
            onHide={() => setShowNoti(false)}
            title="Success!"
            message="Question updated sucessfully!"
          />
        </div>
      ) : (
        flag === "submit" && (
          <div div className="mt-4">
            <Button
              className="bg-primary text-white w-100"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <NotificationModal
              show={showNoti}
              onHide={() => setShowNoti(false)}
              title="Success!"
              message="Question added sucessfully!"
            />
          </div>
        )
      )}
    </div>
  );
}

export default ListenPart2;
