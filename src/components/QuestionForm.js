import React from "react";
import "../styles/Questions.css";
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
    <div
      style={{
        marginTop: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        padding: 5,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: 10,
      }}
    >
      <div
        style={{ display: "inline-flex", marginTop: 5, alignItems: "center" }}
      >
        <h5 style={{ marginLeft: 5 }}>{index + 1}/</h5>
        <input
          className="customInput"
          type="text"
          onChange={(e) => {
            questionText(e.target.value);
          }}
          value={item.Q}
          style={{ width: 800, marginLeft: 5 }}
        ></input>
      </div>
      <div style={{ display: "inline-flex", marginLeft: 5, marginTop: 10 }}>
        <button
          className="btn rounded-circle"
          style={{
            backgroundColor: item.A[0].status && "#5DA110",
            marginRight: 10,
            border: "1px solid black",
            height: 40,
          }}
          onClick={() => {
            handleAnswerChange(0);
          }}
        >
          A
        </button>
        <input
          className="customInput"
          type="text"
          onChange={(e) => {
            answerText(0, e.target.value);
          }}
          value={item.A[0].script}
          id="TR"
        ></input>
      </div>
      <div style={{ display: "inline-flex", marginLeft: 15, marginTop: 10 }}>
        <button
          className="btn rounded-circle"
          style={{
            backgroundColor: item.A[1].status && "#5DA110",
            marginRight: 10,
            border: "1px solid black",
            height: 40,
          }}
          onClick={() => {
            handleAnswerChange(1);
          }}
        >
          B
        </button>
        <input
          className="customInput"
          type="text"
          onChange={(e) => {
            answerText(1, e.target.value);
          }}
          value={item.A[1].script}
          id="TR"
        ></input>
      </div>
      <div style={{ display: "inline-flex", marginLeft: 5, marginTop: 10 }}>
        <button
          className="btn rounded-circle"
          style={{
            backgroundColor: item.A[2].status && "#5DA110",
            marginRight: 10,
            border: "1px solid black",
            height: 40,
          }}
          onClick={() => {
            handleAnswerChange(2);
          }}
        >
          C
        </button>
        <input
          className="customInput"
          type="text"
          onChange={(e) => {
            answerText(2, e.target.value);
          }}
          value={item.A[2].script}
          id="TR"
        ></input>
      </div>
      <div style={{ display: "inline-flex", marginLeft: 15, marginTop: 10 }}>
        <button
          className="btn rounded-circle"
          style={{
            backgroundColor: item.A[3].status && "#5DA110",
            marginRight: 10,
            border: "1px solid black",
            height: 40,
          }}
          onClick={() => {
            handleAnswerChange(3);
          }}
        >
          D
        </button>
        <input
          className="customInput"
          type="text"
          onChange={(e) => {
            answerText(3, e.target.value);
          }}
          value={item.A[3].script}
          id="TR"
        ></input>
      </div>
      {flag !== "see" && (
        <button
          onClick={() => {
            deleteSelf(index);
          }}
          style={{ marginLeft: "92%", borderRadius: 5, marginTop: 10 }}
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default QuestionForm;
