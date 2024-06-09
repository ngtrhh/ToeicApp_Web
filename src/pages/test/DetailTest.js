import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import ListenPart1 from "../question/ListenPart1";
import ListenPart2 from "../question/ListenPart2";
import ListenPart3 from "../question/ListenPart3";
import ListenPart4 from "../question/ListenPart4";
import ReadPart1 from "../question/ReadPart1";
import ReadPart2 from "../question/ReadPart2";
import ReadPart3 from "../question/ReadPart3";
import NoteCard from "../../components/NoteCard";
import api from "../../api/Api";
import "../../styles/Test.css";

function TestView() {
  const location = useLocation();
  const { item, flag } = location?.state;
  const [sign, setSign] = useState("");
  const [testname, setTestName] = useState("");
  const [listenP1, SetListenP1] = useState(new Array(6).fill({}));
  const [listenP2, SetListenP2] = useState(new Array(25).fill({}));
  const [listenP3, SetListenP3] = useState(new Array(13).fill({}));
  const [listenP4, SetListenP4] = useState(new Array(10).fill({}));
  const [readP1, SetReadP1] = useState(new Array(30).fill({}));
  const [readP2, SetReadP2] = useState(new Array(4).fill({}));
  const [readP3, SetReadP3] = useState(new Array(15).fill({}));

  useEffect(() => {
    setTestName(item.Name);
    SetListenP1(item.Part1);
    setSign("ListenPart1");
    SetListenP2(item.Part2);
    SetListenP3(item.Part3);
    SetListenP4(item.Part4);
    SetReadP1(item.Part5);
    SetReadP2(item.Part6);
    SetReadP3(item.Part7);
  }, []);

  const onSave = async () => {
    const test = {
      Part1: listenP1,
      Part2: listenP2,
      Part3: listenP3,
      Part4: listenP4,
      Part5: readP1,
      Part6: readP2,
      Part7: readP3,
      Time: 120,
      Name: testname,
    };
    console.log(test);

    await api.updateTest(item.Id, test);
    alert("Test updated successfully");
  };

  console.log(flag);

  return (
    <div className="p-4">
      <div className="d-flex flex-row justify-content-center">
        <Button
          onClick={() => setSign("ListenPart1")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ListenPart1"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Listening Part 1
        </Button>
        <Button
          onClick={() => setSign("ListenPart2")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ListenPart2"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Listening Part 2
        </Button>
        <Button
          onClick={() => setSign("ListenPart3")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ListenPart3"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Listening Part 3
        </Button>
        <Button
          onClick={() => setSign("ListenPart4")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ListenPart4"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Listening Part 4
        </Button>
        <Button
          onClick={() => setSign("ReadPart1")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ReadPart1"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Reading Part 1
        </Button>
        <Button
          onClick={() => setSign("ReadPart2")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ReadPart2"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Reading Part 2
        </Button>
        <Button
          onClick={() => setSign("ReadPart3")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "ReadPart3"
              ? "bg-primary text-white"
              : "text-dark bg-white"
          )}
          variant="contained"
        >
          Reading Part 3
        </Button>

        {flag === "edit" && (
          <Button onClick={onSave} className="text-white bg-secondary ms-4">
            Save
          </Button>
        )}
      </div>

      <div className="d-flex flex-row mt-4">
        <div style={{ width: "70%" }}>
          {flag === "edit" ? (
            <TextField
              className="mx-4 w-100"
              label="Test name"
              value={testname}
              onChange={(e) => setTestName(e.target.value)}
            />
          ) : (
            <TextField
              className="mx-4 w-100"
              label="Test name"
              value={testname}
            />
          )}
          {sign === "ListenPart1"
            ? listenP1.map((item, key) => (
                <ListenPart1
                  flag={flag}
                  complete={(data) => {
                    let list = listenP1.slice();
                    list[key] = { ...data };
                    SetListenP1(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))
            : sign === "ListenPart2"
            ? listenP2.map((item, key) => (
                <ListenPart2
                  flag={flag}
                  complete={(data) => {
                    let list = listenP2.slice();
                    list[key] = { ...data };
                    SetListenP2(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))
            : sign === "ListenPart3"
            ? listenP3.map((item, key) => (
                <ListenPart3
                  flag={flag}
                  complete={(data) => {
                    let list = listenP3.slice();
                    list[key] = { ...data };
                    SetListenP3(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))
            : sign === "ListenPart4"
            ? listenP4.map((item, key) => (
                <ListenPart4
                  flag={flag}
                  complete={(data) => {
                    let list = listenP4.slice();
                    list[key] = { ...data };
                    SetListenP4(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))
            : sign === "ReadPart1"
            ? readP1.map((item, key) => (
                <ReadPart1
                  flag={flag}
                  complete={(data) => {
                    let list = readP1.slice();
                    list[key] = { ...data };
                    SetReadP1(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))
            : sign === "ReadPart2"
            ? readP2.map((item, key) => {
                return (
                  <ReadPart2
                    flag={flag}
                    complete={(data) => {
                      let list = readP2.slice();
                      list[key] = { ...data };
                      SetReadP2(list);
                    }}
                    key={key}
                    item={{ ...item, Order: key + 1 }}
                  />
                );
              })
            : sign === "ReadPart3" &&
              readP3.map((item, key) => (
                <ReadPart3
                  flag={flag}
                  complete={(data) => {
                    let list = readP3.slice();
                    list[key] = { ...data };
                    SetReadP3(list);
                  }}
                  key={key}
                  item={{ ...item, Order: key + 1 }}
                />
              ))}
        </div>

        <div>
          {sign === "ListenPart1" ? (
            <NoteCard
              title={"Listening Part 1: Photographs"}
              content={
                "In this part, you will look at photographs. For each photograph you will hear four statements. You will have to choose which statement has the best description of the picture."
              }
              note={
                "Input must have Audio, Image and Answer. Others could be blank."
              }
            />
          ) : (
            sign === "ListenPart2" && (
              <NoteCard
                title={`${sign}: Question & Response`}
                content={
                  "In this part, you will be tested on your ability to respond to a question. It is very important that you can understand and identify wh-questions. You will listen to three possible responses. Only one of the responses is correct."
                }
                note={
                  "Input must have Audio and Answer. Others could be blank."
                }
              />
            )
          )}
          {sign === "ListenPart3" && (
            <NoteCard
              title={`${sign}: Short Conversations`}
              content={
                "In this part, you will listen to a short conversation. After the conversation, you will answer three questions about the dialogue. There will be four possible answers for each question. Typical questions include, who, what, where, when, why, and how. You may also be asked to make an inference."
              }
              note={
                "Input must have Audio, Questions and Answers for each. Others could be blank."
              }
            />
          )}
          {sign === "ListenPart4" && (
            <NoteCard
              title={`${sign}: Short Talks`}
              content={
                "In this part, you will listen to a short talk. It might be an announcement, a radio advertisement, or a telephone recording. You will listen to the talk and read a few questions about it."
              }
              note={
                "Input must have Audio, Questions and Answers for each. Others could be blank."
              }
            />
          )}
          {sign === "ReadPart1" && (
            <NoteCard
              title={`${sign}: Incomplete Sentences`}
              content={
                "In this part, you will read a sentence that has one blank spot. There will be four choices of words or phrases to choose from. You will have to choose the one that you think completes the sentence."
              }
              note={
                "Input must have Question and Answer. Others could be blank."
              }
            />
          )}
          {sign === "ReadPart2" && (
            <NoteCard
              title={`${sign}: Text Completion`}
              content={
                "In this part, you will read four passages of text, such as an article, a letter, a form and an e-mail. In each reading passage there will be three blanks to fill in. You will read four possible choices for each blank. You should read the entire passage to make sure you choose the correct choice in context."
              }
              note={
                "Input must have Questions and Answers for each. Others could be blank."
              }
            />
          )}
          {sign === "ReadPart3" && (
            <NoteCard
              title={`${sign}: Reading Comprehension`}
              content={
                "In this part, you will read passages in the form of letters, ads, memos, faxes, schedules, etc. The reading section has a number of single passages and 4 double passages. You will be asked 2-4 questions about each single passage, and 5 questions for each double passage. Sometimes you will be asked for specific details. Other times you will be asked about what the passage implies. In the paired passages you will also be asked to make connections between the two related texts. On the real test you will not have time to read every word. You need to practice scanning and reading quickly for details."
              }
              note={
                "Input must have Paragragh, Questions and Answers for each. Others could be blank."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TestView;
