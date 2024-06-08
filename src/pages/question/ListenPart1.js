import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Button, IconButton, TextField } from "@mui/material";
import NotificationModal from "../../components/NotificationModal";
import NoteCard from "../../components/NoteCard";
import upload from "../../api/upload";
import api from "../../api/Api";
import "../../styles/DetailListen.css";

function ListenPart1({ flag, complete, item }) {
  const [audioFile, setAudioFile] = useState(item?.Audio || "");
  const [imageFile, setImageFile] = useState(item?.Image || "");
  const [audioFile1, setAudioFile1] = useState(null);
  const [imageFile1, setImageFile1] = useState(null);
  const trueIndex = item?.Answer?.findIndex((value) => value === true);
  const temp = trueIndex !== -1 ? trueIndex : null;
  const [selectedAnswer, setSelectedAnswer] = useState(temp);
  const [script, setScript] = useState(item?.Explain?.script || "");
  const [tip, setTip] = useState(item?.Explain?.tip || "");
  const [translation, setTranslation] = useState(
    item?.Explain?.translate || ""
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

  const handleImageChange = (e) => {
    setImageFile1(e.target.files[0]);
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
    if (flag === "edit") {
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
    } else if (flag === "edit") {
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
    <div className="d-flex p-4">
      <div style={{ width: "70%" }}>
        <h2>
          {flag === "submit"
            ? "Add Question Listening Part 1"
            : `Question ${item.Order}`}
        </h2>

        {flag === "view" ? (
          <div className="d-flex flex-column gap-4">
            <div className="muiInput">
              <label className="muiLabel">Audio</label>
              <input type="file" accept="audio/*" className="disabled" />
            </div>
            <TextField
              label="or input the link"
              type="url"
              value={audioFile}
              InputProps={{ readOnly: true }}
            />

            <div className="muiInput">
              <label className="muiLabel">Image</label>
              <input type="file" accept="image/*" className="disabled" />
            </div>

            <TextField
              label="or input the link"
              type="url"
              value={imageFile}
              InputProps={{ readOnly: true }}
            />

            <div className="d-flex align-items-center gap-4">
              <div className="">Answer:</div>

              <IconButton
                className={clsx(
                  "border border-black fs-6 rounded-circle",
                  selectedAnswer === 0 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
              >
                A
              </IconButton>
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  selectedAnswer === 1 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
              >
                B
              </IconButton>
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  selectedAnswer === 2 ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
              >
                C
              </IconButton>
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  selectedAnswer === 3 ? "bg-primary text-white" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
              >
                D
              </IconButton>
            </div>

            <TextField
              multiline
              label="Script"
              value={script}
              rows="4"
              InputProps={{ readOnly: true }}
            />

            <TextField
              multiline
              label="Tip"
              value={tip}
              rows="4"
              InputProps={{ readOnly: true }}
            />

            <TextField
              multiline
              label="Translation"
              value={translation}
              rows="4"
              InputProps={{ readOnly: true }}
            />
          </div>
        ) : (
          flag !== "view" && (
            <div className="d-flex flex-column gap-4">
              <div className="muiInput">
                <label className="muiLabel">Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                />
              </div>

              <TextField
                label="or input the link"
                type="url"
                value={audioFile}
                onChange={(e) => setAudioFile(e.target.value)}
              />

              <div className="muiInput">
                <label className="muiLabel">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <TextField
                label="or input the link"
                type="url"
                value={imageFile}
                onChange={(e) => setImageFile(e.target.value)}
              />

              <div className="d-flex align-items-center gap-4">
                <div className="">Answer:</div>

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
                <IconButton
                  className={clsx(
                    "border border-black fs-6 py-1 rounded-circle",
                    selectedAnswer === 3 ? "bg-primary text-white" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                  onClick={() => handleAnswerChange(3)}
                >
                  D
                </IconButton>
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
          )
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
        {flag === "edit" ? (
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
      <div>
        <NoteCard
          title={"Listening Part 1: Photographs"}
          content={
            "In this part, you will look at photographs. For each photograph you will hear four statements. You will have to choose which statement has the best description of the picture."
          }
          note={
            "Input must have Audio, Image and Answer. Others could be blank."
          }
        />
      </div>
    </div>
  );
}

export default ListenPart1;
