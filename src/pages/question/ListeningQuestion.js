import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import ImageCard from "../../components/question/ImageCard";
import OtherCard from "../../components/question/OtherCard";

const ListeningQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [questionList, setQuestionList] = useState(null);
  const [path] = useState(location.pathname.slice(10));
  const [title] = useState(location.pathname.slice(1).split("/")[1]);
  const [part, setPart] = useState(
    title === "listening"
      ? "ListenPart1"
      : title === "reading"
      ? "ReadPart1"
      : title === "speaking"
      ? "SpeakPart1"
      : title === "writing" && "WritePart1"
  );

  const getQuestion = async (part) => {
    setPart(part);
    const list = await api.getAllQuestion(part);
    setQuestionList(list);
  };

  useEffect(() => {
    getQuestion(part);
  }, [part]);

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="text-primary fw-semibold fs-5 text-uppercase">
          {title} questions
        </div>
        <div style={{ flexGrow: 1 }} />

        <div className="d-flex flex-row gap-4">
          <Button
            className={clsx(
              "shadow-none",
              part === "ListenPart1" ? "bg-primary" : "text-primary bg-light"
            )}
            variant={part === "ListenPart1" ? "contained" : "outlined"}
            onClick={() => setPart("ListenPart1")}
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
              part === "ListenPart2" ? "bg-primary" : "text-primary bg-light"
            )}
            variant={part === "ListenPart2" ? "contained" : "outlined"}
            onClick={() => setPart("ListenPart2")}
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
              part === "ListenPart3" ? "bg-primary" : "text-primary bg-light"
            )}
            variant={part === "ListenPart3" ? "contained" : "outlined"}
            onClick={() => setPart("ListenPart3")}
            sx={{
              borderColor: "#64bb15",
              "&:hover": {
                borderColor: "#64bb15",
              },
            }}
          >
            Part 3
          </Button>
          <Button
            className={clsx(
              "shadow-none",
              part === "ListenPart4" ? "bg-primary" : "text-primary bg-light"
            )}
            variant={part === "ListenPart4" ? "contained" : "outlined"}
            onClick={() => setPart("ListenPart4")}
            sx={{
              borderColor: "#64bb15",
              "&:hover": {
                borderColor: "#64bb15",
              },
            }}
          >
            Part 4
          </Button>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center gap-4 justify-content-between px-4">
        <Button
          variant="contained"
          size="large"
          className="shadow-none bg-secondary fw-semibold"
          onClick={() => {
            if (path === "listening")
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
        {part === "ListenPart1"
          ? questionList?.map((item, key) => (
              <ImageCard
                key={key}
                item={item}
                index={key}
                part={part}
                setQuestionList={setQuestionList}
                questionList={questionList}
              />
            ))
          : part !== "ListenPart1" &&
            questionList?.map((item, key) => (
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

export default ListeningQuestion;
