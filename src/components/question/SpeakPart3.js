import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import NotificationModal from "../NotificationModal";
import "../../styles/Question.css";

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

  const navigate = useNavigate();

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
    if (context === "") {
      errorFields.push("Context");
    }
    if (question[0] === "" || question[1] === "" || question[2] === "") {
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
    } else if (flag === "edit") {
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
          ? "Add Question Speaking Part 3"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" ? (
        <div className="d-flex flex-column gap-4">
          <TextField
            label="Context"
            value={item.Context}
            onChange={(e) => setContext(e.target.value)}
            rows="4"
            multiline
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
            <TextField
              label="Context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows="4"
              multiline
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

export default SpeakPart3;
