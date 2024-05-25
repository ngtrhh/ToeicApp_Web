import React, { useState, useEffect } from "react";
import "../styles/Test.css";
import ListenPart1 from "./ListenPart1";
import ListenPart2 from "./ListenPart2";
import ListenPart3 from "./ListenPart3";
import ListenPart4 from "./ListenPart4";
import ReadPart1 from "./ReadPart1";
import ReadPart2 from "./ReadPart2";
import ReadPart3 from "./ReadPart3";
import api from "../api/Api";
import { useLocation } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function TestView() {
  const location = useLocation();
  const { item, flag } = location.state;
  const [sign, SetSign] = useState("");
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
    SetSign("L1");
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

  return (
    <div>
      <div style={{ display: "flex", marginLeft: "10%" }}>
        <button
          onClick={() => SetSign("L1")}
          className={sign == "L1" ? "TextClick" : "TextNormal"}
        >
          ListenPart1
        </button>
        <button
          onClick={() => SetSign("L2")}
          className={sign == "L2" ? "TextClick" : "TextNormal"}
        >
          ListenPart2
        </button>
        <button
          onClick={() => SetSign("L3")}
          className={sign == "L3" ? "TextClick" : "TextNormal"}
        >
          ListenPart3
        </button>
        <button
          onClick={() => SetSign("L4")}
          className={sign == "L4" ? "TextClick" : "TextNormal"}
        >
          ListenPart4
        </button>
        <button
          onClick={() => SetSign("R1")}
          className={sign == "R1" ? "TextClick" : "TextNormal"}
        >
          ReadPart1
        </button>
        <button
          onClick={() => SetSign("R2")}
          className={sign == "R2" ? "TextClick" : "TextNormal"}
        >
          ReadPart2
        </button>
        <button
          onClick={() => SetSign("R3")}
          className={sign == "R3" ? "TextClick" : "TextNormal"}
        >
          ReadPart3
        </button>
        {flag == "fix" && (
          <button
            onClick={() => onSave()}
            type="button"
            className="btn btn-light"
            style={{
              backgroundColor: "#F88C19",
              color: "#fff",
              marginLeft: 20,
              width: 80,
            }}
          >
            Save
          </button>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "70%" }}>
          <div style={{ marginTop: 30, overflow: "auto" }}>
            <div
              style={{ marginLeft: "10%", width: "80%" }}
              className="testname-wrapper"
            >
              <label
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                Test name:
                <textarea
                  className="customInput"
                  value={testname}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </label>
            </div>

            {sign == "L1" &&
              listenP1.map((each, key) => {
                return (
                  <ListenPart1
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = listenP1.slice();
                      list[key] = { ...data };
                      SetListenP1(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "L2" &&
              listenP2.map((each, key) => {
                return (
                  <ListenPart2
                    flag={flag}
                    index={key + 6}
                    complete={(data) => {
                      let list = listenP2.slice();
                      list[key] = { ...data };
                      SetListenP2(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "L3" &&
              listenP3.map((each, key) => {
                return (
                  <ListenPart3
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = listenP3.slice();
                      list[key] = { ...data };
                      SetListenP3(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "L4" &&
              listenP4.map((each, key) => {
                return (
                  <ListenPart4
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = listenP4.slice();
                      list[key] = { ...data };
                      SetListenP4(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "R1" &&
              readP1.map((each, key) => {
                return (
                  <ReadPart1
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = readP1.slice();
                      list[key] = { ...data };
                      SetReadP1(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "R2" &&
              readP2.map((each, key) => {
                return (
                  <ReadPart2
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = readP2.slice();
                      list[key] = { ...data };
                      SetReadP2(list);
                    }}
                    item={each}
                  />
                );
              })}
            {sign == "R3" &&
              readP3.map((each, key) => {
                return (
                  <ReadPart3
                    flag={flag}
                    index={key}
                    complete={(data) => {
                      let list = readP3.slice();
                      list[key] = { ...data };
                      SetReadP3(list);
                    }}
                    item={each}
                  />
                );
              })}
          </div>
        </div>

        <div>
          {sign === "L1" && (
            <NoteCard
              title={`${sign}: Photographs`}
              content={
                "In this part, you will look at photographs. For each photograph you will hear four statements. You will have to choose which statement has the best description of the picture."
              }
              note={
                "Input must have Audio, Image and Answer. Others could be blank."
              }
            />
          )}
          {sign === "L2" && (
            <NoteCard
              title={`${sign}: Question & Response`}
              content={
                "In this part, you will be tested on your ability to respond to a question. It is very important that you can understand and identify wh-questions. You will listen to three possible responses. Only one of the responses is correct."
              }
              note={"Input must have Audio and Answer. Others could be blank."}
            />
          )}
          {sign === "L3" && (
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
          {sign === "L4" && (
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
          {sign === "R1" && (
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
          {sign === "R2" && (
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
          {sign === "R3" && (
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
