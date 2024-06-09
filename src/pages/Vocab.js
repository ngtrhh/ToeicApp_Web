import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import VocabTopicCard from "../components/VocabTopicCard";
import AddTopicForm from "../components/AddTopicForm";
import api from "../api/Api";
import "../styles/Vocab.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

function Vocab() {
  const navigate = useNavigate();
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
      Image: item.image,
      Topic: item.topic,
      VocabQuantity: item.qty,
    };
    const res = await api.addVocabLesson(data1);
    let list = topics.slice();
    list[topics.length - 1].Id = res;
    list.push({
      Image: "-1",
      Topic: "-1",
      VocabQuantity: "-1",
    });

    setTopics(list);
    for (let i = 0; i < item.vocabs.length; i++) {
      let data2 = { ...item.vocabs[i], TopicId: res };
      await api.addVocab(data2);
    }
  };

  const deleteTopic = async (item) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this topic? It will delete all the vocabularies in this topic."
    );

    if (shouldDelete) {
      const list = topics.filter((topic) => topic.Id !== item.Id);
      await api.deleteTopic(item.Id);
      setTopics(list);
    }
  };

  const viewTopic = (item) => {
    navigate("/vocabulary/" + item.Id, {
      state: { TopicId: item.Id, TopicName: item.Topic },
    });
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
            <VocabTopicCard
              key={key}
              item={each}
              deleteTopic={deleteTopic}
              viewTopic={viewTopic}
            />
          );
        })}
      </div>
      {openModal && (
        <AddTopicForm
          complete={(data) => {
            setTopics([...topics, data]);
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
