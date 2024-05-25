import React, { useState, useEffect } from "react";
import ListenPart1Screen from "./ListenPart1Screen";
import api from "../api/Api";
import { BiHeadphone, BiBook, BiPencil, BiMicrophone } from "react-icons/bi";
import "../styles/Questions.css";

const Questions = () => {
  const [sign, SetSign] = useState("ListenPart1");
  const [listQ, setListQ] = useState(null);

  const getquestion = async (part) => {
    SetSign(part);
    const list = await api.getAllQuestion(part);
    setListQ(list);
  };

  useEffect(() => {
    getquestion("ListenPart1");
  }, []);

  return (
    <div className="d-flex">
      <div className="col-auto bg-light d-flex flex-column min-vh-100 px-3 pt-2 h-100">
        <div className="nav my-1 d-flex flex-column" id="parrentM">
          <a
            href="#submenu"
            className="nav-link d-flex text-black fs-5 fw-semibold gap-3 justify-content-center"
            data-bs-toggle="collapse"
            aria-current="page"
          >
            <BiHeadphone size={32} />
            <span className="d-none d-sm-inline flex-fill">Listening</span>
            <span className="bi bi-caret-down-fill" />
          </a>
          <ul
            className="nav collapse ms-2 d-flex flex-column show"
            id="submenu"
            data-bs-parent="#parrentM"
          >
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ListenPart1"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ListenPart1");
                }}
              >
                Listening Part 1
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ListenPart2"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ListenPart2");
                }}
              >
                Listening Part 2
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ListenPart3"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ListenPart3");
                }}
              >
                Listening Part 3
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ListenPart4"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ListenPart4");
                }}
              >
                Listening Part 4
              </button>
            </li>
          </ul>
        </div>

        <div className="nav my-1 d-flex flex-column" id="parrentM1">
          <a
            href="#submenu1"
            className="nav-link d-flex text-black fs-5 fw-semibold gap-3 justify-content-center"
            data-bs-toggle="collapse"
            aria-current="page"
          >
            <BiBook size={32} />
            <span className="d-none d-sm-inline flex-fill">Reading</span>
            <span className="bi bi-caret-down-fill" />
          </a>
          <ul
            className="nav collapse ms-2 flex-column"
            id="submenu1"
            data-bs-parent="#parrentM1"
          >
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ReadPart1"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ReadPart1");
                }}
              >
                Reading Part 1
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ReadPart2"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ReadPart2");
                }}
              >
                Reading Part 2
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "ReadPart3"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("ReadPart3");
                }}
              >
                Reading Part 3
              </button>
            </li>
          </ul>
        </div>

        <div className="nav my-1 d-flex flex-column" id="parrentM2">
          <a
            href="#submenu2"
            className="nav-link d-flex text-black fs-5 fw-semibold gap-3 justify-content-center"
            data-bs-toggle="collapse"
            aria-current="page"
          >
            <BiMicrophone size={32} />
            <span className="d-none d-sm-inline flex-fill">Speaking</span>
            <span className="bi bi-caret-down-fill" />
          </a>
          <ul
            className="nav collapse ms-2 d-flex flex-column"
            id="submenu2"
            data-bs-parent="#parrentM2"
          >
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "SpeakPart1"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("SpeakPart1");
                }}
              >
                Speaking Part 1
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "SpeakPart2"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("SpeakPart2");
                }}
              >
                Speaking Part 2
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "SpeakPart3"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("SpeakPart3");
                }}
              >
                Speaking Part 3
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "SpeakPart4"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("SpeakPart4");
                }}
              >
                Speaking Part 4
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "SpeakPart5"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("SpeakPart5");
                }}
              >
                Speaking Part 5
              </button>
            </li>
          </ul>
        </div>

        <div className="nav my-1 d-flex flex-column" id="parrentM3">
          <a
            href="#submenu3"
            className="nav-link d-flex text-black fs-5 fw-semibold gap-3 justify-content-center"
            data-bs-toggle="collapse"
            aria-current="page"
          >
            <BiPencil size={32} />
            <span className="d-none d-sm-inline flex-fill">Writing</span>
            <span className="bi bi-caret-down-fill" />
          </a>
          <ul
            className="nav collapse ms-2 flex-column"
            id="submenu3"
            data-bs-parent="#parrentM3"
          >
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "WritePart1"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("WritePart1");
                }}
              >
                Writing Part 1
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "WritePart2"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("WritePart2");
                }}
              >
                Writing Part 2
              </button>
            </li>
            <li className="d-flex">
              <button
                type="button"
                className={
                  sign === "WritePart3"
                    ? "btn btn-light w-100 text-start fw-semibold bg-primary text-white"
                    : "btn btn-light w-100 text-start fw-semibold"
                }
                onClick={() => {
                  getquestion("WritePart3");
                }}
              >
                Writing Part 3
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="col py-3 overflow-x-auto">
        <ListenPart1Screen
          sign={sign}
          listQ={listQ}
          Remove={async (key, id) => {
            const shouldDelete = window.confirm(
              "Are you sure you want to delete this question?"
            );
            if (shouldDelete) {
              const list = listQ.slice();
              list.splice(key, 1);
              setListQ(list);
              await api.deleteQuestion(sign, id);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Questions;
