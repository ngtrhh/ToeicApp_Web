import React, { useState } from "react";
import clsx from "clsx";
import { Button, IconButton, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import NotificationModal from "../NotificationModal";
import "../../styles/Question.css";

function ReadPart1({ flag, complete, item }) {
  const [question, setQuestion] = useState(item?.Question || "");
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
  const [textR4, setTextR4] = useState(
    item && item.Answer ? item.Answer[3]?.script : ""
  );
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
  };

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    if (question === "") {
      errorFields.push("Question");
    }
    if (
      selectedAnswer === null ||
      selectedAnswer === -1 ||
      textR1 === "" ||
      textR2 === "" ||
      textR3 === "" ||
      textR4 === ""
    ) {
      errorFields.push("Answer");
    }
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (errorFields.length > 0) {
      setErrors(inputError);
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    let answerL = [];
    let text = [textR1, textR2, textR3, textR4];
    for (let i = 0; i < 4; i++) {
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

    if (flag === "submit") {
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order: await api.countQuestion("ReadPart1"),
      };
      console.log(data);
      await api.addQuestion("ReadPart1", data);
      setQuestion("");
      setSelectedAnswer(null);
      setTextR1("");
      setTextR2("");
      setTextR3("");
      setTextR4("");
      setTip("");
      setTranslation("");
      setScript("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "Test") {
      let data = {
        Question: question,
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
        Question: question,
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
          ? "Add Question Reading Part 1"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" ? (
        <div className="d-flex flex-column gap-4">
          <TextField
            label="Question"
            value={item.Question}
            rows="2"
            multiline
          />

          <div>Answer:</div>
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-4 align-items-center">
              <IconButton
                className={clsx(
                  "border border-black fs-6 rounded-circle",
                  item.Answer[0].status ? "bg-primary" : "bg-white"
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
              />
            </div>
            <div className="d-flex gap-4 align-items-center">
              <IconButton
                className={clsx(
                  "border border-black fs-6 py-1 rounded-circle",
                  item.Answer[1].status ? "bg-primary" : "bg-white"
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
                  item.Answer[2].status ? "bg-primary" : "bg-white"
                )}
                style={{ height: 28, width: 28 }}
              >
                C
              </IconButton>
              <TextField
                className="w-100"
                type="text"
                value={item.Answer[2].script}
                size="small"
              />
            </div>

            {item.Answer[3] && (
              <div className="d-flex gap-4 align-items-center">
                <IconButton
                  className={clsx(
                    "border border-black fs-6 py-1 rounded-circle",
                    item.Answer[3].status ? "bg-primary" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                >
                  C
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  value={item.Answer[3].script}
                  size="small"
                />
              </div>
            )}
          </div>

          <TextField
            multiline
            label="Script"
            value={item.Explain.script}
            rows="4"
          />

          <TextField multiline label="Tip" value={item.Explain.tip} rows="4" />

          <TextField
            multiline
            label="Translation"
            value={item.Explain.translate}
            rows="4"
          />
        </div>
      ) : (
        flag !== "view" && (
          <div className="d-flex flex-column gap-4">
            <TextField
              label="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="2"
              multiline
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
                  onChange={(e) => setTextR1(e.target.value)}
                  value={textR1}
                  size="small"
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
                  onChange={(e) => setTextR2(e.target.value)}
                  value={textR2}
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
                  onClick={() => handleAnswerChange(2)}
                >
                  C
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  onChange={(e) => setTextR3(e.target.value)}
                  value={textR3}
                  size="small"
                />
              </div>
              <div className="d-flex gap-4 align-items-center">
                <IconButton
                  className={clsx(
                    "border border-black fs-6 py-1 rounded-circle",
                    selectedAnswer === 3 ? "bg-primary" : "bg-white"
                  )}
                  style={{ height: 28, width: 28 }}
                  onClick={() => handleAnswerChange(3)}
                >
                  D
                </IconButton>
                <TextField
                  className="w-100"
                  type="text"
                  onChange={(e) => setTextR4(e.target.value)}
                  value={textR4}
                  size="small"
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
  );
}

export default ReadPart1;
