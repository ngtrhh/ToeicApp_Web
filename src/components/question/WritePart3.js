import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import NotificationModal from "../NotificationModal";
import "../../styles/Question.css";

function WritePart3({ item, complete, flag, index }) {
  const [question, setQuestion] = useState(item?.Question || "");
  const [sampleAnswer, setSampleAnswer] = useState(
    item?.Explain?.SampleAnswer || ""
  );
  const [tip, setTip] = useState(item?.Explain?.Tips || "");
  const [errors, setErrors] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const navigate = useNavigate();

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
        },
        Order: await api.countQuestion("WritePart3"),
      };
      await api.addQuestion("WritePart3", data);
      setQuestion("");
      setTip("");
      setSampleAnswer("");
      setErrors("");
      setShowNoti(true);
    } else if (flag === "edit") {
      let data = {
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
    <div className="d-flex p-4 flex-column">
      {/* {flag !== "Test" && (
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Link>
      )} */}
      <h2>
        {flag === "submit"
          ? "Add Question Writing Part 3"
          : `Question ${item.Order}`}
      </h2>

      {flag === "view" && (
        <div className="d-flex flex-column gap-4">
          <TextField
            label="Question"
            value={item.Question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="3"
            multiline
          />

          <TextField
            label="Sample Answer"
            value={item.Explain.SampleAnswer}
            onChange={(e) => setSampleAnswer(e.target.value)}
            rows="10"
            multiline
          />

          <TextField
            label="Tips"
            value={item.Explain.Tips}
            onChange={(e) => setTip(e.target.value)}
            rows="4"
            multiline
          />
        </div>
      )}
      {flag !== "view" && (
        <div className="d-flex flex-column gap-4">
          <TextField
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="3"
            multiline
          />

          <TextField
            label="Sample Answer"
            value={sampleAnswer}
            onChange={(e) => setSampleAnswer(e.target.value)}
            rows="10"
            multiline
          />

          <TextField
            label="Tips"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            rows="4"
            multiline
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
  );
}

export default WritePart3;
