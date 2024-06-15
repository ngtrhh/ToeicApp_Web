import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useLocation } from "react-router-dom";
import api from "../../api/Api";
import "../../styles/Vocab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function VocabPage() {
  const data = useLocation()?.state;
  const [sign, setSign] = useState("");
  const [vocabList, setVocabList] = useState(null);
  const [example, setExample] = useState("");
  const [spell, setSpell] = useState("");
  const [type, setType] = useState("n");
  const [vocab, setVocab] = useState("");
  const [translate, setTranslate] = useState("");
  const [listenFile, setListenFile] = useState("");
  const [idVocab, setIdVocab] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState("");

  const getListVocab = async () => {
    const res = await api.getVocabinLesson(data.TopicId);
    const list = res?.map((item, index) => ({
      ...item,
      id: index + 1,
      key: index + 1,
    }));
    setVocabList(list);
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
    const temp = {
      id: vocabList?.length + 1,
      key: vocabList?.length + 1,
      Example: example,
      Spelling: spell,
      Type: type,
      Vocab: vocab,
      Translate: translate,
      ListenFile: listenFile,
      TopicId: data.TopicId,
    };
    setVocabList([...vocabList, temp]);
    setOpenModal(false);
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

  // const columns = [
  //   {
  //     field: "key",
  //     headerName: "#",
  //     width: 50,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "Vocab",
  //     headerName: "Vocabulary",
  //     flex: 1,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "Type",
  //     headerName: "Type",
  //     flex: 1,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "Spelling",
  //     headerName: "Phonetic Symbols",
  //     flex: 1,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "Translate",
  //     headerName: "Translation",
  //     flex: 1,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "Example",
  //     headerName: "Example",
  //     flex: 1,
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "ListenFile",
  //     headerName: "Audio File",
  //     align: "center",
  //     headerAlign: "center",
  //     headerClassName: "bg-primary text-white",
  //   },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     align: "center",
  //     headerClassName: "bg-primary text-white",
  //     cellClassName: "d-flex justify-content-center",
  //     renderCell: (params) => {
  //       return (
  //         <div>
  //           <IconButton
  //             className="color-primary"
  //             onClick={async () => {
  //               const row = params.row;
  //               const shouldDelete = window.confirm(
  //                 "Are you sure you want to delete this vocabulary?"
  //               );
  //               if (shouldDelete) {
  //                 await api.updateTopic(data.TopicId, {
  //                   VocabQuantity: vocabList.length - 1,
  //                 });
  //                 setVocabList(vocabList.filter((item) => item.Id !== row.Id));
  //                 await api.deleteVocab(row.Id);
  //               }
  //             }}
  //           >
  //             <Delete />
  //           </IconButton>
  //           <IconButton
  //             className="color-primary"
  //             onClick={() => {
  //               const row = params.row;
  //               setSign("edit");
  //               setIdVocab(row.Id);
  //               setVocab(row.Vocab);
  //               setListenFile(row.ListenFile);
  //               setType(row.Type);
  //               setSpell(row.Spelling);
  //               setExample(row.Example);
  //               setTranslate(row.Translate);
  //               setOpenModal(true);
  //             }}
  //           >
  //             <Edit />
  //           </IconButton>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="text-primary fw-semibold fs-5 text-uppercase">
          Vocabularies in{" "}
          <span className="text-dark">{data.TopicName} Topic</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button
          className="shadow-none bg-secondary "
          variant="contained"
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
          startIcon={<Add />}
        >
          Add Topic
        </Button>
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
            {vocabList?.map((each) => {
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
                      {/* <FontAwesomeIcon
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
                      /> */}
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
                            setVocabList(
                              vocabList.filter((item) => item.Id != each.Id)
                            );
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

      {/* <DataGrid
        className="bg-white"
        columns={columns}
        rows={vocabList}
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
        sx={{
          "& .MuiDataGrid-footerContainer": { display: "none" },
          "& .MuiDataGrid-root": {
            borderTopLeftRadius: "0 !important",
            borderTopRightRadius: 0,
          },
          "& .MuiDataGrid-overlayWrapper": {
            minHeight: "50px !important",
          },
          "& .MuiDataGrid-filler": {
            display: "none",
          },
        }}
      /> */}

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
            <h2 className="text-center fw-semibold text-primary text-uppercase">
              {sign === "add" ? "Add" : "Update"} Vocabulary
            </h2>
            <TextField
              label="Vocabulary"
              onChange={(e) => {
                if (sign !== "see") setVocab(e.target.value);
              }}
              value={vocab}
              fullWidth
            />
            <TextField
              className="mt-4"
              type="url"
              label="Audio File"
              onChange={(e) => {
                if (sign !== "see") setListenFile(e.target.value);
              }}
              value={listenFile}
              fullWidth
            />
            <TextField
              className="mt-4"
              label="Phonetic Symbols"
              onChange={(e) => {
                if (sign !== "see") setSpell(e.target.value);
              }}
              value={spell}
              fullWidth
            />
            <FormControl fullWidth className="mt-4">
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                {["n", "v", "adj", "adv", "prep", "conj"].map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="mt-4"
              label="Example"
              multiline
              rows={2}
              type="text"
              onChange={(e) => {
                if (sign !== "see") setExample(e.target.value);
              }}
              value={example}
              fullWidth
            />
            <TextField
              className="mt-4"
              label="Translation"
              onChange={(e) => {
                if (sign !== "see") setTranslate(e.target.value);
              }}
              value={translate}
              fullWidth
            />

            {errors && <div className="error">{errors}</div>}
            {sign === "add" && (
              <div className="d-flex mt-4 align-items-center justify-content-center">
                <Button
                  variant="contained"
                  className="shadow-none bg-secondary"
                  onClick={
                    sign === "add"
                      ? handleComplete
                      : sign === "edit" && handleComplete1
                  }
                >
                  {sign === "add" ? "Submit" : sign === "edit" && "Update"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default VocabPage;
