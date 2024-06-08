import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import api from "../../api/Api";
import NotificationModal from "../../components/NotificationModal";
import NoteCard from "../../components/NoteCard";
import "../../styles/DetailListen.css";

function SpeakPart1({ flag, item, complete, index }) {
  const [translation, setTranslation] = useState(
    item?.Explain?.Translation || ""
  );
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
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
          Translation: translation,
        },
        Order: await api.countQuestion("SpeakPart1"),
      };
      await api.addQuestion("SpeakPart1", data);
      setQuestion("");
      setTip("");
      setTranslation("");
      setSampleAnswer("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "edit") {
      let data = {
        Question: question,
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
    <div className="container d-flex p-4">
      <div style={{ width: "70%" }}>
        <h2>
          {flag === "submit"
            ? "Add Question Speaking Part 1"
            : `Question ${item.Order}`}
        </h2>

        {flag === "view" && (
          <div className="d-flex flex-column gap-4">
            <TextField
              label="Question"
              value={item.Question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="4"
              multiline
            />

            <TextField
              label=" Sample Answer"
              value={item.Explain.SampleAnswer}
              onChange={(e) => setSampleAnswer(e.target.value)}
              rows="4"
              multiline
            />

            <TextField
              multiline
              label="Tip"
              value={item.Explain.Tips}
              rows="4"
            />

            <TextField
              multiline
              label="Translation"
              value={item.Explain.Translation}
              rows="4"
            />
          </div>
        )}
        {flag !== "view" && (
          <div className="d-flex flex-column gap-4">
            <TextField
              label="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="4"
              multiline
            />

            <TextField
              label=" Sample Answer"
              value={sampleAnswer}
              onChange={(e) => setSampleAnswer(e.target.value)}
              rows="4"
              multiline
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
          title={"Speaking Part 1: Read a text aloud"}
          content={
            "In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud."
          }
          note={"Input must have Question. Others could be blank."}
        />
      </div>
    </div>
  );
}

export default SpeakPart1;
