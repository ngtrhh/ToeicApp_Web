import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import TopicCard from "../../components/vocab/TopicCard";
import AddTopicForm from "../../components/vocab/AddTopicForm";
import api from "../../api/Api";
import "../../styles/Vocab.css";

function Vocab() {
  const [openModal, setOpenModal] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getVocabLesson = async () => {
      const list = await api.getVocabLesson();
      setTopics(list);
    };

    getVocabLesson();
  }, []);

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="text-primary fw-semibold fs-5 text-uppercase">
          vocabulary topics
        </div>
        <div style={{ flexGrow: 1 }} />

        <Button
          className="shadow-none bg-secondary "
          variant="contained"
          onClick={() => setOpenModal(true)}
          startIcon={<Add />}
        >
          Add Topic
        </Button>
      </div>

      <div className="container row row-cols-5 m-auto gap-3">
        {topics?.map((each, key) => {
          return (
            <TopicCard
              key={key}
              item={each}
              topics={topics}
              setTopics={setTopics}
            />
          );
        })}
      </div>
      {openModal && (
        <AddTopicForm
          closeModal={() => setOpenModal(false)}
          setTopics={setTopics}
          topics={topics}
        />
      )}
    </div>
  );
}

export default Vocab;
