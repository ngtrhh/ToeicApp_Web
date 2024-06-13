import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../api/Api";

const ImageCard = ({ item, index, part, setQuestionList, questionList }) => {
  const deleteQuestion = async (e) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (shouldDelete) {
      setQuestionList(questionList.filter((record) => record.Id !== item.Id));
      await api.deleteQuestion(part, item.Id);
    }
  };

  return (
    <Card sx={{ maxWidth: 240 }} className="mx-2 px-0" variant="outlined">
      <CardActionArea>
        <Link
          to={`/question/${item.Id}`}
          state={{
            part: part,
            item: item,
            flag: "view",
            index: index,
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={
              item.Image
                ? item.Image
                : item.Picture
                ? item.Picture
                : "https://cdn3.emoji.gg/emojis/8014_green_question.png"
            }
            alt={`Question ${item.Id}`}
          />
          <CardContent className="pb-1 fw-semibold">
            Question {item.Order}
          </CardContent>
          <CardActions>
            <Link
              to={`/question/${item.Id}/edit`}
              state={{
                part: part,
                item: item,
                flag: "edit",
                index: index,
              }}
              className="w-100"
            >
              <Button
                size="small"
                startIcon={<Edit />}
                className="w-100 text-body text-center"
              >
                Edit
              </Button>
            </Link>
            <Button
              size="small"
              startIcon={<Delete />}
              onClick={(e) => deleteQuestion(e)}
              className="w-100 text-body text-center"
            >
              Delete
            </Button>
          </CardActions>
        </Link>
      </CardActionArea>
    </Card>
  );
};
export default ImageCard;
