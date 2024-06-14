import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../api/Api";
import "../../styles/Vocab.css";

const TopicCard = ({ item, setTopics, topics }) => {
  const deleteTopic = async (e) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this topic? It will delete all the vocabularies in this topic."
    );

    if (shouldDelete) {
      setTopics(topics.filter((topic) => topic.Id !== item.Id));
      await api.deleteTopic(item.Id);
    }
  };

  return (
    <div className="d-flex flex-row">
      <Card sx={{ minWidth: 240 }} className="mx-2 px-0" variant="outlined">
        <CardActionArea>
          <Link
            to={`/vocabulary/${item.Id}`}
            state={{
              TopicId: item.Id,
              TopicName: item.Topic,
            }}
          >
            <CardMedia
              component="img"
              height="194"
              image={item.Image}
              alt={`Question ${item.Id}`}
            />
            <CardContent className="pb-1 fw-semibold text-center">
              <div>{item?.Topic}</div>
              <div className="fs-6 fw-normal text-body">
                {"Quantity: " + item?.VocabQuantity}
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<Delete />}
                onClick={(e) => deleteTopic(e)}
                className="w-100 text-body text-center "
              >
                Delete
              </Button>
            </CardActions>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default TopicCard;
