import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/Api";
import OtherCard from "../components/question/OtherCard";
import ImageCard from "../components/question/ImageCard";

const WritingQuestion = () => {
  const navigate = useNavigate();
  const title = useLocation().pathname.slice(1).split("/")[1];

  const [questionList, setQuestionList] = useState(null);
  const [part, setPart] = useState("WritePart1");

  const getQuestion = async (part) => {
    setPart(part);
    const list = await api.getAllQuestion(part);
    setQuestionList(list);
  };

  useEffect(() => {
    getQuestion(part);
  }, [part]);

  console.log(questionList);

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="text-primary fw-semibold fs-5 text-uppercase">
          {title} questions
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button
          className={clsx(
            "shadow-none",
            part === "WritePart1" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "WritePart1" ? "contained" : "outlined"}
          onClick={() => setPart("WritePart1")}
          sx={{
            borderColor: "#64bb15",
            "&:hover": {
              borderColor: "#64bb15",
            },
          }}
        >
          Part 1
        </Button>
        <Button
          className={clsx(
            "shadow-none",
            part === "WritePart2" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "WritePart2" ? "contained" : "outlined"}
          onClick={() => setPart("WritePart2")}
          sx={{
            borderColor: "#64bb15",
            "&:hover": {
              borderColor: "#64bb15",
            },
          }}
        >
          Part 2
        </Button>
        <Button
          className={clsx(
            "shadow-none",
            part === "WritePart3" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "WritePart3" ? "contained" : "outlined"}
          onClick={() => setPart("WritePart3")}
          sx={{
            borderColor: "#64bb15",
            "&:hover": {
              borderColor: "#64bb15",
            },
          }}
        >
          Part 3
        </Button>
      </div>

      <div className="d-flex flex-row align-items-center gap-4 justify-content-between px-4">
        <Button
          variant="contained"
          size="large"
          className="shadow-none bg-secondary fw-semibold"
          onClick={() => {
            navigate("/question/add", {
              state: { part: part, flag: "submit" },
            });
          }}
          startIcon={<Add />}
        >
          Add question
        </Button>
        <div className="fs-5">
          <span className="fw-semibold">Total: </span>
          {questionList && questionList.length}
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 g-4 mt-0">
        {part !== "WritePart1"
          ? questionList?.map((item, key) => (
              <OtherCard key={key} item={item} index={key} part={part} />
            ))
          : part === "WritePart1" &&
            questionList?.map((item, key) => (
              <ImageCard key={key} item={item} index={key} part={part} />
            ))}
      </div>
    </div>
  );
};

export default WritingQuestion;
