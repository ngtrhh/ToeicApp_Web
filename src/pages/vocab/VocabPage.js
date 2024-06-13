import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import api from "../../api/Api";
import "../../styles/Vocab.css";

function VocabPage() {
  const data = useLocation()?.state;
  const [sign, setSign] = useState("");
  const [vocabList, setVocabList] = useState([]);
  const [example, setExample] = useState("");
  const [spell, setSpell] = useState("");
  const [type, setType] = useState("n");
  const [vocab, setVocab] = useState("");
  const [translate, setTranslate] = useState("");
  const [listenFile, setListenFile] = useState("");
  const [idVocab, setIdVocab] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [searchVocab, setSearchVocab] = useState("");
  const [errors, setErrors] = useState("");

  const getListVocab = async () => {
    const res = await api.getVocabinLesson(data.TopicId);
    setVocabList(res);
  };

  useEffect(() => {
    getListVocab();
    //eslint-disable-line react-hooks/exhaustive-deps
  }, [vocabList]);

  function isAudioUrl(url) {
    try {
      new URL(url);
      const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
      return audioUrlRegex.test(url.toLowerCase());
    } catch (error) {
      return false;
    }
  }

  console.log(type);

  const validateData = () => {
    let errorFields = [];
    let audioError = "";
    let inputError = "";
    if (vocab === "") {
      errorFields.push("Vocabulary");
    }
    if (listenFile === null || listenFile === "") {
      errorFields.push("Audio File");
    }
    if (spell === "") {
      errorFields.push("Phonetic Symbols");
    }
    if (type === "") {
      errorFields.push("Type");
    }
    if (example === "") {
      errorFields.push("Example");
    }
    if (translate === "") {
      errorFields.push("Translation");
    }
    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";
    if (listenFile !== null && listenFile !== "" && !isAudioUrl(listenFile))
      audioError = "\nThe audio url link is not valid!";
    if (errorFields.length > 0 || !isAudioUrl(listenFile)) {
      setErrors(inputError + audioError);
      return false;
    } else return true;
  };

  const handleComplete = async () => {
    if (!validateData()) return;
    await api.updateTopic(data.TopicId, {
      VocabQuantity: vocabList.length + 1,
    });
    await api.addVocab({
      Example: example,
      Spelling: spell,
      Type: type,
      Vocab: vocab,
      Translate: translate,
      ListenFile: listenFile,
      TopicId: data.TopicId,
    });
    getListVocab();
    setErrors("");
    setOpenModal(false);
  };

  const handleComplete1 = async () => {
    if (!validateData()) return;
    await api.updateVocab(idVocab, {
      Example: example,
      Spelling: spell,
      Type: type,
      Vocab: vocab,
      Translate: translate,
      ListenFile: listenFile,
      TopicId: data.TopicId,
    });
    getListVocab();
    setErrors("");
    setOpenModal(false);
  };

  return (
    <div className="d-flex flex-column px-3">
      <h3 className="ms-4 my-4 text-center fw-bold w-100">
        Vocabularies in <span className="text-primary">{data.TopicName}</span>
      </h3>

      <div className="d-flex flex-row gap-3">
        <button
          type="button"
          className="btn btn-light bg-secondary text-white"
          onClick={() => {
            setSign("add");
            setVocab("");
            setListenFile("");
            setType("n");
            setSpell("");
            setExample("");
            setTranslate("");
            setOpenModal(true);
          }}
        >
          Add Vocabulary
        </button>
        <button type="button" className="btn btn-light bg-primary text-white">
          Search
        </button>
        <input
          style={{ minWidth: "250px", height: "40px" }}
          type="text"
          onChange={(e) => setSearchVocab(e.target.value)}
          value={searchVocab}
          placeholder="Enter a vocabulary"
        />
      </div>

      <div>
        <table className="table">
          <thead>
            <tr className="table-secondary">
              <th>Vocabulary</th>
              <th>Type</th>
              <th>Phonetic Symbols</th>
              <th>Translation</th>
              <th>Example</th>
              <th>Audio File</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vocabList?.map((each, key) => {
              return (
                <tr key={each?.Id}>
                  <td>{each?.Vocab}</td>
                  <td>{each?.Type}</td>
                  <td>{each?.Spelling}</td>
                  <td>{each?.Translate}</td>
                  <td>{each?.Example}</td>
                  <td>{each?.ListenFile}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => {
                          setSign("edit");
                          setIdVocab(each.Id);
                          setVocab(each.Vocab);
                          setListenFile(each.ListenFile);
                          setType(each.Type);
                          setSpell(each.Spelling);
                          setExample(each.Example);
                          setTranslate(each.Translate);
                          setOpenModal(true);
                        }}
                        color="green"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="green"
                        onClick={async () => {
                          const shouldDelete = window.confirm(
                            "Are you sure you want to delete this vocabulary?"
                          );
                          if (shouldDelete) {
                            await api.updateTopic(data.TopicId, {
                              VocabQuantity: vocabList.length - 1,
                            });
                            const list = vocabList.slice();
                            list.splice(key, 1);
                            setVocabList(list);
                            await api.deleteVocab(each.Id);
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target.className === "modal-container") {
              setOpenModal(false);
              setErrors("");
            }
          }}
        >
          <div
            className="add-form-modal bg-white p-4 fw-semibold"
            style={{
              scrollbarWidth: "thin",
              height: "fit-content",
              marginTop: "10%",
            }}
          >
            <h2 className="text-center text-secondary">
              {sign === "add" ? "Add" : "Update"} Vocabulary
            </h2>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Vocabulary:</div>
              <input
                type="text"
                onChange={(e) => {
                  if (sign !== "see") setVocab(e.target.value);
                }}
                value={vocab}
                required
              />
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Audio File:</div>
              <input
                type="url"
                onChange={(e) => {
                  if (sign !== "see") setListenFile(e.target.value);
                }}
                value={listenFile}
                required
              />
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Phonetic Symbols:</div>
              <input
                type="text"
                onChange={(e) => {
                  if (sign !== "see") setSpell(e.target.value);
                }}
                value={spell}
                required
              />
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Type:</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type"
              >
                <option value="n">n</option>
                <option value="v">v</option>
                <option value="adj">adj</option>
                <option value="adv">adv</option>
                <option value="prep">prep</option>
                <option value="conj">conj</option>
              </select>
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Example:</div>
              <textarea
                rows={2}
                type="text"
                onChange={(e) => {
                  if (sign !== "see") setExample(e.target.value);
                }}
                value={example}
              />
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ flex: 1 }}>Translation:</div>
              <input
                type="text"
                onChange={(e) => {
                  if (sign !== "see") setTranslate(e.target.value);
                }}
                value={translate}
              />
            </div>

            {errors && <div className="error">{errors}</div>}
            {sign === "add" && (
              <button
                type="button"
                className="btn btn-light bg-secondary text-white d-block m-auto mt-3"
                style={{ width: 100 }}
                onClick={
                  sign === "add"
                    ? handleComplete
                    : sign === "edit" && handleComplete1
                }
              >
                {sign === "add" ? "Submit" : sign === "edit" && "Update"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default VocabPage;
