import React, { useState } from "react";
import "../styles/Vocab.css";

const AddTopicForm = ({ complete, closeModal }) => {
  const [imageFile, setImageFile] = useState();
  const [topic, setTopic] = useState("");
  const [qty, setQty] = useState(null);
  const [flag, setFlag] = useState("1");
  const [vocabs, setVocabs] = useState([]);
  const [errors, setErrors] = useState("");

  function isImageUrl(url) {
    try {
      new URL(url);
      const imageUrlRegex = /^(https?:\/\/)/;
      return imageUrlRegex.test(url.toLowerCase());
    } catch (error) {
      return false;
    }
  }

  const validateData = () => {
    let errorFields = [];
    let imgError = "";
    let inputError = "";
    let qtyError = "";

    if (imageFile === "" || imageFile === null) {
      errorFields.push("Image File");
    }

    if (topic === "") {
      errorFields.push("Topic");
    }

    if (qty === null || qty === "") {
      errorFields.push("Quantity");
    }

    if (imageFile !== "" && imageFile !== null && !isImageUrl(imageFile))
      imgError = "\nThe image url link is not valid!";

    if (qty !== "" && qty !== null && qty < 0)
      qtyError = "\nThe quantity must be greater than 0!";

    if (errorFields.length > 0)
      inputError =
        "Please input complete information: " + errorFields.join(", ") + ". ";

    if (errorFields.length > 0 || !isImageUrl(imageFile)) {
      setErrors(inputError + imgError + qtyError);
      return false;
    } else return true;
  };

  const handleNext = () => {
    if (!validateData()) return;

    let list = [];
    for (let i = 0; i < qty; i++) {
      list.push({
        Example: "",
        Spelling: "",
        Type: "n",
        Vocab: "",
        Translate: "",
        ListenFile: "",
      });
    }
    setVocabs(list);
    setFlag("2");
    setErrors("");
  };

  function isAudioUrl(url) {
    try {
      new URL(url);
      const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
      return audioUrlRegex.test(url.toLowerCase());
    } catch (error) {
      return false;
    }
  }

  const validateData2 = () => {
    let audioError = "";
    let inputError = "";
    const hasEmptyInput = vocabs.some(
      (item) =>
        item.Vocab === "" ||
        item.ListenFile === "" ||
        item.Spelling === "" ||
        item.Type === "" ||
        item.Translate === "" ||
        item.Example === ""
    );
    const hasInvalidAudio = vocabs.some((item) => !isAudioUrl(item.ListenFile));
    if (hasEmptyInput)
      inputError =
        "Please input complete information: Vocabulary, Audio File, Phonetic Symbols, Type, Example, Translation. ";
    if (hasInvalidAudio) audioError = "\nThe audio url link is not valid!";
    if (hasEmptyInput) {
      setErrors(inputError + audioError);
      return false;
    } else return true;
  };

  const handleComplete = () => {
    if (!validateData2()) return;
    const data = {
      Image: imageFile,
      Topic: topic,
      VocabQuantity: qty,
      vocabs: vocabs,
    };
    setErrors("");
    complete(data);
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          setErrors("");
          closeModal();
        }
      }}
    >
      <div
        className="add-form-modal bg-white p-4 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <h2 className="text-center">Add Topic</h2>
        {flag === "1" ? (
          <div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ width: "80px" }}>Image:</div>
              <input
                type="url"
                onChange={(e) => setImageFile(e.target.value)}
                value={imageFile}
                placeholder="Enter an image url"
                required
              />
            </div>
            {imageFile && (
              <img src={imageFile} alt="Topic Image" className="topicImage" />
            )}
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ width: "80px" }}>Topic: </div>
              <input
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                placeholder="Enter topic name"
                required
              />
            </div>
            <div className="d-flex flex-row mt-4 ms-4 align-items-center">
              <div style={{ width: "80px" }}>Quantity: </div>
              <input
                type="number"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                placeholder="Enter number of vocabularies in this topic"
                required
              />
            </div>
            <br />
            <button
              type="button"
              className="btn btn-light bg-secondary text-white d-block m-auto mt-3"
              style={{ width: 100 }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        ) : (
          flag === "2" && (
            <div>
              {vocabs.map((each, key) => (
                <div className="vocab-form" key={key}>
                  <h4>{key + 1}/</h4>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>Vocabulary: </div>
                    <input
                      type="text"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].Vocab = e.target.value;
                        setVocabs(list);
                      }}
                      value={each.Vocab}
                    />
                  </div>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>Audio File: </div>
                    <input
                      type="url"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].ListenFile = e.target.value;
                        setVocabs(list);
                      }}
                      value={each.ListenFile}
                    />
                  </div>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>{"Phonetic Symbols: "}</div>
                    <input
                      className="customInput"
                      type="text"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].Spelling = e.target.value;
                        setVocabs(list);
                      }}
                      value={each.Spelling}
                    />
                  </div>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>Type: </div>
                    <select
                      id="type"
                      name="chiNhanh"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].Type = e.target.value;
                        setVocabs(list);
                      }}
                    >
                      <option value="n">n</option>
                      <option value="v">v</option>
                      <option value="adj">adj</option>
                      <option value="adv">adv</option>
                      <option value="prep">prep</option>
                      <option value="conj">conj</option>
                    </select>
                  </div>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>Example: </div>
                    <textarea
                      rows={2}
                      type="text"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].Example = e.target.value;
                        setVocabs(list);
                      }}
                      value={each.Example}
                    />
                  </div>
                  <div className="d-flex w-100 align-items-center mb-4 gap-2">
                    <div style={{ flex: 1 }}>Translation: </div>
                    <input
                      type="text"
                      onChange={(e) => {
                        let list = vocabs.slice();
                        list[key].Translate = e.target.value;
                        setVocabs(list);
                      }}
                      value={each.Translate}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-light bg-secondary text-white d-block m-auto mt-3"
                style={{ width: 100 }}
                onClick={handleComplete}
              >
                Complete
              </button>
            </div>
          )
        )}

        {errors && <div className="text-danger">{errors}</div>}
      </div>
    </div>
  );
};
export default AddTopicForm;
