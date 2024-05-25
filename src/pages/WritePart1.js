import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from "../api/Api";
import client from "../api/client";
import axios from "axios";
import upload from "../api/upload";
import NotificationModal from "../components/NotificationModal";

function WritePart1({ item, complete, flag, index }) {
  const [imageFile, setImageFile] = useState(item?.Picture || null);
  const [imageFile1, setImageFile1] = useState(null);
  const [word, setWord] = useState(item?.SugesstedWord);
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ""
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || "");
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const handleImageChange = (e) => {
    setImageFile1(e.target.files[0]);
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

  const validateData = () => {
    let errorFields = [];
    let imgError = "";
    let inputError = "";
    if (imageFile == "" || (imageFile == null && imageFile1 == null)) {
      errorFields.push("Image File");
    }
    if (word == "") {
      errorFields.push("Suggested Word");
    }
    const isImgValid = imageFile1 != null || isImageUrl(imageFile);
    if (imageFile != "" && imageFile != null && !isImgValid)
      imgError = "\nThe image url link is not valid!";
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (errorFields.length > 0 || !isImgValid) {
      setErrors(inputError + imgError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;

    let image = imageFile;
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

    if (flag === "submit") {
      let data = {
        Picture: image,
        SugesstedWord: word,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
        Order: await api.countQuestion("WritePart1"),
      };
      await api.addQuestion("WritePart1", data);
      setImageFile("");
      setImageFile1(null);
      setTip("");
      setSampleAnswer("");
      setWord("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "fix") {
      let data = {
        Picture: image,
        SugesstedWord: word,
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
        <h2>Add Question Writing Part 1</h2>
      ) : (
        <h2>Question {index + 1} </h2>
      )}
      {flag === "see" && (
        <>
          <div className="fileContainer">
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
                value={item.Picture}
              />
            </label>
          </div>
          <div className="flex-column">
            <div>
              Suggested word:
              <label style={{ display: "flex" }}>
                <input
                  className="customInput"
                  type="text"
                  value={item.SugesstedWord}
                  onChange={(e) => setWord(e.target.value)}
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
                  rows="1"
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
          <div className="fileContainer">
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
          <div className="flex-column">
            <div>
              Suggested word:
              <label style={{ display: "flex" }}>
                <input
                  className="customInput"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
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
                  rows="1"
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

export default WritePart1;
