import React from "react";
import clsx from "clsx";
import { TextField, IconButton, Button } from "@mui/material";

const QuestionForm = ({
  index,
  handleAnswerChange,
  deleteSelf,
  item,
  questionText,
  answerText,
  flag,
}) => {
  return (
    <div className="mt-3">
      <div className="d-flex flex-column">
        <TextField
          className="mb-2"
          value={item.Q}
          onChange={
            flag === "view" ? null : (e) => questionText(e.target.value)
          }
        />
      </div>
      <div className="d-flex gap-4 align-items-center">
        <IconButton
          className={clsx(
            "border border-black fs-6 rounded-circle",
            item.A[0].status ? "bg-primary" : "bg-white"
          )}
          style={{ height: 28, width: 28 }}
          onClick={flag === "view" ? null : () => handleAnswerChange(0)}
        >
          A
        </IconButton>
        <TextField
          className="w-100"
          type="text"
          value={item.A[0].script}
          size="small"
          onChange={
            flag === "view" ? null : (e) => answerText(0, e.target.value)
          }
        />
      </div>
      <div className="d-flex gap-4 align-items-center">
        <IconButton
          className={clsx(
            "border border-black fs-6 rounded-circle",
            item.A[1].status ? "bg-primary" : "bg-white"
          )}
          style={{ height: 28, width: 28 }}
          onClick={flag === "view" ? null : () => handleAnswerChange(1)}
        >
          B
        </IconButton>
        <TextField
          className="w-100"
          type="text"
          value={item.A[1].script}
          size="small"
          onChange={
            flag === "view" ? null : (e) => answerText(1, e.target.value)
          }
        />
      </div>
      <div className="d-flex gap-4 align-items-center">
        <IconButton
          className={clsx(
            "border border-black fs-6 rounded-circle",
            item.A[2].status ? "bg-primary" : "bg-white"
          )}
          style={{ height: 28, width: 28 }}
          onClick={flag === "view" ? null : () => handleAnswerChange(2)}
        >
          C
        </IconButton>
        <TextField
          className="w-100"
          type="text"
          value={item.A[2].script}
          size="small"
          onChange={
            flag === "view" ? null : (e) => answerText(2, e.target.value)
          }
        />
      </div>
      <div className="d-flex gap-4 align-items-center">
        <IconButton
          className={clsx(
            "border border-black fs-6 rounded-circle",
            item.A[3].status ? "bg-primary" : "bg-white"
          )}
          style={{ height: 28, width: 28 }}
          onClick={flag === "view" ? null : () => handleAnswerChange(3)}
        >
          D
        </IconButton>
        <TextField
          className="w-100"
          type="text"
          value={item.A[3].script}
          size="small"
          onChange={
            flag === "view" ? null : (e) => answerText(3, e.target.value)
          }
        />
      </div>
      {flag !== "view" && (
        <div className="d-flex w-100 justify-content-end mt-2">
          <Button
            onClick={() => deleteSelf(index)}
            variant="contained"
            className="bg-primary shadow-none"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default QuestionForm;
