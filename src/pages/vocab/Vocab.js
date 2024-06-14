import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import TopicCard from "../../components/vocab/TopicCard";
import AddTopicForm from "../../components/AddTopicForm";
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

  const addTopic = async (item) => {
    const data1 = {
      Image: item.Image,
      Topic: item.Topic,
      VocabQuantity: item.VocabQuantity,
    };
    const res = await api.addVocabLesson(data1);
    setTopics([...topics, { ...item, Id: res }]);
    console.log(res);
    for (let i = 0; i < item.vocabs.length; i++) {
      let data2 = { ...item.vocabs[i], TopicId: res };
      await api.addVocab(data2);
    }
  };

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
          complete={(data) => {
            addTopic(data);
            setOpenModal(false);
          }}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default Vocab;
