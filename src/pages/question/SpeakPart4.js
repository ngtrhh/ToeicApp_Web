import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import api from "../../api/Api";
import upload from "../../api/upload";
import NotificationModal from "../../components/NotificationModal";
import "../../styles/DetailListen.css";

function SpeakPart4({ item, complete, flag, index }) {
  const [translation, setTranslation] = useState(
    item?.Explain?.Translation || ["", "", "", ""]
  );
  const [question, setQuestion] = useState(item?.Question || ["", "", ""]);
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ["", "", ""]
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || ["", "", ""]);
  const [imageFile, setImageFile] = useState(item?.AvailableInfo || null);
  const [imageFile1, setImageFile1] = useState(null);
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const handleSetQuestion = (i, t) => {
    let list = question.slice();
    list[i] = t;
    setQuestion(list);
  };
  const handleImageChange = (e) => {
    setImageFile1(e.target.files[0]);
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
    if (question[0] === "" || question[1] === "" || question[2] === "") {
      errorFields.push("Questions");
    }
    const isImgValid = imageFile1 !== null || isImageUrl(imageFile);
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
        Question: question,
        AvailableInfo: image,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
        },
        Order: await api.countQuestion("SpeakPart4"),
      };
      //console.log(data);

      // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);

      await api.addQuestion("SpeakPart4", data);
      setImageFile(null);
      setImageFile1(null);
      setQuestion(["", "", ""]);
      setTip(["", "", ""]);
      setTranslation(["", "", "", ""]);
      setSampleAnswer(["", "", ""]);
      setErrors("");
      setShowNoti(true);
    } else if (flag === "edit") {
      let data = {
        Question: question,
        AvailableInfo: image,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
        },
      };
      complete(data);
    }
  };

  return (
    <div className="d-flex p-4 flex-column">
      <h2>
        {flag === "submit"
          ? "Add Question Speaking Part 4"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" ? (
        <div className="d-flex flex-column gap-4">
          <div className="muiInput">
            <label className="muiLabel">Available Information</label>
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
            value={item.AvailableInfo}
          />

          <div>
            <div>Question:</div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-4 align-items-center">
                <h5>1.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item?.Question[0]}
                  size="small"
                  onChange={(e) => handleSetQuestion(0, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>2.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item?.Question[1]}
                  size="small"
                  onChange={(e) => handleSetQuestion(1, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>3.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item?.Question[2]}
                  size="small"
                  onChange={(e) => handleSetQuestion(2, e.target.value)}
                />
              </div>
            </div>
          </div>

          <TextField
            label="Context Translation"
            value={item.Explain.Translation[0]}
            onChange={(e) => handleSetTrans(0, e.target.value)}
            rows="4"
            multiline
          />
          <div>
            <div>Question Translation:</div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-4 align-items-center">
                <h5>1.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Translation[1]}
                  size="small"
                  onChange={(e) => handleSetTrans(1, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>2.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Translation[2]}
                  size="small"
                  onChange={(e) => handleSetTrans(2, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>3.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Translation[3]}
                  size="small"
                  onChange={(e) => handleSetTrans(3, e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div>Sample Answer:</div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-4 align-items-center">
                <h5>1.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.SampleAnswer[0]}
                  size="small"
                  onChange={(e) => handleSetSample(0, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>2.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.SampleAnswer[1]}
                  size="small"
                  onChange={(e) => handleSetSample(1, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>3.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.SampleAnswer[2]}
                  size="small"
                  onChange={(e) => handleSetSample(2, e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div>Tip:</div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-4 align-items-center">
                <h5>1.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Tips[0]}
                  size="small"
                  onChange={(e) => handleSetTips(0, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>2.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Tips[1]}
                  size="small"
                  onChange={(e) => handleSetTips(1, e.target.value)}
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <h5>3.</h5>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Explain.Tips[2]}
                  size="small"
                  onChange={(e) => handleSetTips(2, e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        flag !== "view" && (
          <div className="d-flex flex-column gap-4">
            <div className="muiInput">
              <label className="muiLabel">Available Information</label>
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

            <div>
              <div>Question:</div>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-4 align-items-center">
                  <h5>1.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={question[0]}
                    size="small"
                    onChange={(e) => handleSetQuestion(0, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>2.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={question[1]}
                    size="small"
                    onChange={(e) => handleSetQuestion(1, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>3.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={question[2]}
                    size="small"
                    onChange={(e) => handleSetQuestion(2, e.target.value)}
                  />
                </div>
              </div>
            </div>

            <TextField
              label="Context Translation"
              value={translation[0]}
              onChange={(e) => handleSetTrans(0, e.target.value)}
              rows="4"
              multiline
            />
            <div>
              <div>Question Translation:</div>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-4 align-items-center">
                  <h5>1.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={translation[1]}
                    size="small"
                    onChange={(e) => handleSetTrans(1, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>2.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={translation[2]}
                    size="small"
                    onChange={(e) => handleSetTrans(2, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>3.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={translation[3]}
                    size="small"
                    onChange={(e) => handleSetTrans(3, e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div>Sample Answer:</div>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-4 align-items-center">
                  <h5>1.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={sampleAnswer[0]}
                    size="small"
                    onChange={(e) => handleSetSample(0, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>2.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={sampleAnswer[1]}
                    size="small"
                    onChange={(e) => handleSetSample(1, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>3.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={sampleAnswer[2]}
                    size="small"
                    onChange={(e) => handleSetSample(2, e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div>Tip:</div>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-4 align-items-center">
                  <h5>1.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={tip[0]}
                    size="small"
                    onChange={(e) => handleSetTips(0, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>2.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={tip[1]}
                    size="small"
                    onChange={(e) => handleSetTips(1, e.target.value)}
                  />
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>3.</h5>
                  <TextField
                    className="w-100"
                    type="text"
                    value={tip[2]}
                    size="small"
                    onChange={(e) => handleSetTips(2, e.target.value)}
                  />
                </div>
              </div>
            </div>
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

export default SpeakPart4;
