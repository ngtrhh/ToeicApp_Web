import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import upload from "../../api/upload";
import NotificationModal from "../NotificationModal";
import "../../styles/Question.css";

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

  const navigate = useNavigate();

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
    if (imageFile === "" || (imageFile === null && imageFile1 === null)) {
      errorFields.push("Image File");
    }
    if (word === "") {
      errorFields.push("Suggested Word");
    }
    const isImgValid = imageFile1 != null || isImageUrl(imageFile);
    if (imageFile !== "" && imageFile !== null && !isImgValid)
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
    } else if (flag === "edit") {
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
    <div className="d-flex p-4 flex-column">
      {flag !== "Test" && (
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Link>
      )}
      <h2>
        {flag === "submit"
          ? "Add Question Writing Part 1"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" ? (
        <div className="d-flex flex-column gap-4">
          <div className="muiInput">
            <label className="muiLabel">Image</label>
            <input
              type="file"
              accept="image/*"
              className="disabled"
              onChange={handleImageChange}
            />
          </div>

          <TextField
            label="or input the link"
            type="url"
            onChange={(e) => setImageFile(e.target.value)}
            value={item.Picture}
          />

          <TextField
            label="Suggested word"
            value={item.SugesstedWord}
            onChange={(e) => setWord(e.target.value)}
          />

          <TextField
            label="Sample Answer"
            value={item.Explain.SampleAnswer}
            onChange={(e) => setSampleAnswer(e.target.value)}
            multiline
          />

          <TextField
            label="Tips"
            value={item.Explain.Tips}
            onChange={(e) => setTip(e.target.value)}
            rows="3"
            muk
          />
        </div>
      ) : (
        flag !== "view" && (
          <div className="d-flex flex-column gap-4">
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
              onChange={(e) => setImageFile(e.target.value)}
              value={imageFile}
            />

            <TextField
              label="Suggested word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <TextField
              label="Sample Answer"
              value={sampleAnswer}
              onChange={(e) => setSampleAnswer(e.target.value)}
              multiline
            />

            <TextField
              label="Tips"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              rows="3"
              muk
            />
          </div>
        )
      )}

      {errors && <div className="error">{errors}</div>}

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
  );
}

export default WritePart1;
