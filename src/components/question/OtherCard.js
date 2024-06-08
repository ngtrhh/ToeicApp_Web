import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardActionArea,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../api/Api";

const OtherCard = ({ item, index, part }) => {
  const deleteQuestion = async (e) => {
    console.log(part);

    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (shouldDelete) {
      await api.deleteQuestion(part, item.Id);
    }
  };

  return (
    <Card sx={{ maxWidth: 240 }} className="mx-2 px-0" variant="outlined">
      <CardActionArea className="h-100 d-flex flex-column">
        <Link
          to={`/question/${item.Id}`}
          state={{
            part: part,
            item: item,
            flag: "view",
            index: index,
          }}
          className="h-100 d-flex flex-column"
        >
          <CardContent className="pb-1 fw-semibold" style={{ flexGrow: 1 }}>
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

export default OtherCard;
