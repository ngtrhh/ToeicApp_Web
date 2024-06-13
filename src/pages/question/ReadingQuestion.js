import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import OtherCard from "../../components/question/OtherCard";

const ReadingQuestion = () => {
  const navigate = useNavigate();
  const title = useLocation().pathname.slice(1).split("/")[1];

  const [questionList, setQuestionList] = useState(null);
  const [part, setPart] = useState("ReadPart1");

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
            part === "ReadPart1" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "ReadPart1" ? "contained" : "outlined"}
          onClick={() => setPart("ReadPart1")}
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
            part === "ReadPart2" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "ReadPart2" ? "contained" : "outlined"}
          onClick={() => setPart("ReadPart2")}
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
            part === "ReadPart3" ? "bg-primary" : "text-primary bg-light"
          )}
          variant={part === "ReadPart3" ? "contained" : "outlined"}
          onClick={() => setPart("ReadPart3")}
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
        {questionList?.map((item, key) => (
          <OtherCard
            key={key}
            item={item}
            index={key}
            part={part}
            setQuestionList={setQuestionList}
            questionList={questionList}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadingQuestion;
