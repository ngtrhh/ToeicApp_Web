import React, { useState } from "react";
import api from "../../api/Api";
import QuestionForm from "../../components/question/QuestionForm";
import NotificationModal from "../../components/NotificationModal";
import { Button, TextField } from "@mui/material";
import "../../styles/DetailListen.css";

function ReadPart2({ flag, index, complete, item }) {
  const [script, setScript] = useState(item?.Explain?.script || "");
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

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    let quantityError = "";

    const hasEmptyQ = number.some((item) => item.Q === "");
    const hasEmptyScript = number.some((item) =>
      item.A.some((answer) => answer.script === "")
    );
    const hasNoTrueAnswer = number.some((question) => {
      return !question.A.some((answer) => answer.status);
    });
    if (hasEmptyQ || hasEmptyScript || hasNoTrueAnswer) {
      errorFields.push("Questions and Answers");
    }

    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (number.length !== 4)
      quantityError = "The number of questions in this part must be 4!";
    if (
      errorFields.length > 0 ||
      number.length !== 4 ||
      hasEmptyQ ||
      hasEmptyScript ||
      hasNoTrueAnswer
    ) {
      setErrors(inputError + quantityError);
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
    if (flag === "submit") {
      let data = {
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
        Order: await api.countQuestion("ReadPart2"),
      };
      await api.addQuestion("ReadPart2", data);
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
    } else if (flag === "edit") {
      let data = {
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
  console.log(flag);

  return (
    <div className="d-flex p-4 flex-column">
      <h2>
        {flag === "submit"
          ? "Add Question Reading Part 2"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" ? (
        <div className="d-flex flex-column gap-4">
          <div>
            <div>Question:</div>
            {item.Question.map((each, key) => {
              return (
                <QuestionForm key={key} index={key} item={each} flag={flag} />
              );
            })}
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
            <div>
              <div className="d-flex justify-content-between">
                <div>Question:</div>
                <Button
                  className="bg-primary text-white"
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
                >
                  Add question
                </Button>
              </div>
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

export default ReadPart2;
