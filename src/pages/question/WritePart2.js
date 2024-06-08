import React, { useState } from "react";
import api from "../../api/Api";
import NotificationModal from "../../components/NotificationModal";
import NoteCard from "../../components/NoteCard";
import "../../styles/DetailListen.css";
import { Button, TextField } from "@mui/material";

function WritePart2({ item, complete, flag, index }) {
  const [direction, setDirection] = useState(item?.Direction || "");
  const [question, setQuestion] = useState(item?.Question || "");
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ""
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || "");
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const validateData = () => {
    let errorFields = [];
    let inputError = "";
    if (direction === "") {
      errorFields.push("Direction");
    }
    if (question === "") {
      errorFields.push("Question");
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
        Direction: direction,
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
        Order: await api.countQuestion("WritePart2"),
      };

      await api.addQuestion("WritePart2", data);
      setDirection("");
      setQuestion("");
      setTip("");
      setSampleAnswer("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "edit") {
      let data = {
        Direction: direction,
        Question: question,
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
    <div className="container d-flex p-4">
      <div style={{ width: "70%" }}>
        <h2>
          {flag === "submit"
            ? "Add Question Writing Part 2"
            : `Question ${item.Order}`}
        </h2>

        {flag === "view" ? (
          <div className="d-flex flex-column gap-4">
            <TextField
              label="Direction"
              value={item.Direction}
              onChange={(e) => setDirection(e.target.value)}
              rows="2"
              multiline
            />

            <TextField
              label="Question"
              value={item.Question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="7"
              multiline
            />

            <TextField
              label="Sample Answer"
              value={item.Explain.SampleAnswer}
              onChange={(e) => setSampleAnswer(e.target.value)}
              rows="7"
              multiline
            />

            <TextField
              label="Tips"
              value={item.Explain.Tips}
              onChange={(e) => setTip(e.target.value)}
              rows="3"
              multiline
            />
          </div>
        ) : (
          flag !== "view" && (
            <div className="d-flex flex-column gap-4">
              <TextField
                label="Direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                rows="2"
                multiline
              />

              <TextField
                label="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows="7"
                multiline
              />

              <TextField
                label="Sample Answer"
                value={sampleAnswer}
                onChange={(e) => setSampleAnswer(e.target.value)}
                rows="7"
                multiline
              />

              <TextField
                label="Tips"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                rows="3"
                multiline
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
      <div>
        <NoteCard
          title="Writing Part 2: Respond to a written request"
          content={
            "In this part of the test, you will show how well you can write a response to an e-mail. \n\n Your response will be scored on the quality and variety of your sentences, vocabulary, and organization. \n\n You will have 10 minutes to read and answer each e-mail."
          }
          note={
            "Input must have Direction and Question (Email). Others could be blank."
          }
        />
      </div>
    </div>
  );
}

export default WritePart2;
