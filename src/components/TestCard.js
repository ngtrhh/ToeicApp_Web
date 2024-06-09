import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Api from "../api/Api";

function TestCard({ item }) {
  const deleteTest = async (e) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (shouldDelete) {
      await Api.deleteTest(item.Id);
    }
  };

  return (
    <Card variant="outlined" className="mx-2 px-0">
      <CardActionArea>
        <Link
          to={`/test/${item.Id}`}
          state={{
            item: item,
            flag: "view",
          }}
          className="text-dark"
        >
          <CardContent>
            <div className="fs-4 fw-semibold">{item.Name}</div>
            <div className="fs-6">120 minutes | 7 parts | 200 questions</div>
          </CardContent>
          <CardActions>
            <Link
              to={`/test/${item.Id}/edit`}
              state={{
                item: item,
                flag: "edit",
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
              className="w-100 text-body text-center"
              onClick={(e) => deleteTest(e)}
            >
              Delete
            </Button>
          </CardActions>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default TestCard;
