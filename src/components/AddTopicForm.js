import React, { useState } from "react";
import "../styles/Vocab.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AddTopicForm = ({ complete, closeModal }) => {
  const [imageFile, setImageFile] = useState();
  const [topic, setTopic] = useState("");
  const [qty, setQty] = useState(null);
  const [flag, setFlag] = useState(1);
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
    setFlag(2);
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
        <h2 className="text-center fw-semibold text-primary text-uppercase">
          Add Topic
        </h2>
        {flag === 1 ? (
          <div>
            <TextField
              label="Image"
              type="url"
              onChange={(e) => setImageFile(e.target.value)}
              value={imageFile}
              placeholder="Enter an image url"
              fullWidth
            />
            {imageFile && (
              <img src={imageFile} alt="Topic Image" className="topicImage" />
            )}
            <TextField
              label="Topic"
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              placeholder="Enter topic name"
              fullWidth
              className="mt-4"
            />
            <TextField
              label="Quantity"
              type="number"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
              placeholder="Enter number of vocabularies in this topic"
              fullWidth
              className="mt-4"
            />
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="contained"
                className="bg-secondary shadow-none"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          flag === 2 && (
            <div>
              {vocabs.map((each, key) => (
                <div className="vocab-form" key={key}>
                  <h5 className="fw-semibold">{key + 1}.</h5>
                  <TextField
                    label="Vocabulary"
                    onChange={(e) => {
                      let list = vocabs.slice();
                      list[key].Vocab = e.target.value;
                      setVocabs(list);
                    }}
                    value={each.Vocab}
                    fullWidth
                  />
                  <TextField
                    className="mt-4"
                    label="Audio File"
                    type="url"
                    onChange={(e) => {
                      let list = vocabs.slice();
                      list[key].ListenFile = e.target.value;
                      setVocabs(list);
                    }}
                    value={each.ListenFile}
                    fullWidth
                  />
                  <TextField
                    className="mt-4"
                    label="Phonetic Symbols"
                    onChange={(e) => {
                      let list = vocabs.slice();
                      list[key].Spelling = e.target.value;
                      setVocabs(list);
                    }}
                    value={each.Spelling}
                    fullWidth
                  />
                  <FormControl fullWidth className="mt-4">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={each.Type}
                      onChange={(e) => {
                        let list = vocabs.slice();

                        list[key].Type = e.target.value;
                        setVocabs(list);
                      }}
                    >
                      {["n", "v", "adj", "adv", "prep", "conj"].map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    className="mt-4"
                    label="Example"
                    onChange={(e) => {
                      let list = vocabs.slice();
                      list[key].Example = e.target.value;
                      setVocabs(list);
                    }}
                    value={each.Example}
                    fullWidth
                  />
                  <TextField
                    className="mt-4"
                    label="Translation"
                    onChange={(e) => {
                      let list = vocabs.slice();
                      list[key].Translate = e.target.value;
                      setVocabs(list);
                    }}
                    value={each.Translate}
                    fullWidth
                  />
                </div>
              ))}
              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="contained"
                  className="bg-secondary shadow-none"
                  onClick={handleComplete}
                >
                  Complete
                </Button>
              </div>
            </div>
          )
        )}

        {errors && <div className="text-danger">{errors}</div>}
      </div>
    </div>
  );
};
export default AddTopicForm;
