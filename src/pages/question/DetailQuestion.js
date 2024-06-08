import React from "react";
import { useLocation } from "react-router-dom";
import ListenPart1 from "./ListenPart1";
import ListenPart2 from "./ListenPart2";
import ListenPart3 from "./ListenPart3";
import ListenPart4 from "./ListenPart4";
import ReadPart1 from "./ReadPart1";
import ReadPart2 from "./ReadPart2";
import ReadPart3 from "./ReadPart3";
import WritePart1 from "./WritePart1";
import WritePart2 from "./WritePart2";
import WritePart3 from "./WritePart3";
import SpeakPart1 from "./SpeakPart1";
import SpeakPart2 from "./SpeakPart2";
import SpeakPart3 from "./SpeakPart3";
import SpeakPart4 from "./SpeakPart4";
import SpeakPart5 from "./SpeakPart5";
import api from "../../api/Api";

const DetailQuestion = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="container">
      {data.part === "ListenPart1" ? (
        <ListenPart1
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ListenPart1", data.item.Id, each);
          }}
        />
      ) : data.part === "ListenPart2" ? (
        <ListenPart2
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ListenPart2", data.item.Id, each);
          }}
        />
      ) : data.part === "ListenPart3" ? (
        <ListenPart3
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ListenPart3", data.item.Id, each);
          }}
        />
      ) : data.part === "ListenPart4" ? (
        <ListenPart4
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ListenPart4", data.item.Id, each);
          }}
        />
      ) : data.part === "ReadPart1" ? (
        <ReadPart1
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ReadPart1", data.item.Id, each);
          }}
        />
      ) : data.part === "ReadPart2" ? (
        <ReadPart2
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ReadPart2", data.item.Id, each);
          }}
        />
      ) : data.part === "ReadPart3" ? (
        <ReadPart3
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("ReadPart3", data.item.Id, each);
          }}
        />
      ) : data.part === "SpeakPart1" ? (
        <SpeakPart1
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("SpeakPart1", data.item.Id, each);
          }}
        />
      ) : data.part === "SpeakPart2" ? (
        <SpeakPart2
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("SpeakPart2", data.item.Id, each);
          }}
        />
      ) : data.part === "SpeakPart3" ? (
        <SpeakPart3
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("SpeakPart3", data.item.Id, each);
          }}
        />
      ) : data.part === "SpeakPart4" ? (
        <SpeakPart4
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("SpeakPart4", data.item.Id, each);
          }}
        />
      ) : data.part === "SpeakPart5" ? (
        <SpeakPart5
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("SpeakPart5", data.item.Id, each);
          }}
        />
      ) : data.part === "WritePart1" ? (
        <WritePart1
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("WritePart1", data.item.Id, each);
          }}
        />
      ) : data.part === "WritePart2" ? (
        <WritePart2
          item={data.item}
          flag={data.flag}
          complete={async (each) => {
            await api.updateQuestion("WritePart2", data.item.Id, each);
          }}
        />
      ) : (
        data.part === "WritePart3" && (
          <WritePart3
            item={data.item}
            flag={data.flag}
            complete={async (each) => {
              await api.updateQuestion("WritePart3", data.item.Id, each);
            }}
          />
        )
      )}
    </div>
  );
};
export default DetailQuestion;
