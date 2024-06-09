import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";
import TestCard from "../../components/TestCard";
import "../../styles/Test.css";

function Test() {
  const [searchTest, setSearchTest] = useState("");
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTests = async () => {
      const list = await api.getAllTest();
      setTests(list);
    };

    getTests();
  }, []);

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">
        Test list
      </div>

      <div className="d-flex flex-row gap-4 px-4">
        <Button
          className="bg-primary text-white shadow-none"
          variant="contained"
          onClick={() => {
            navigate(`/Test/add`);
          }}
        >
          Add Test
        </Button>

        <Button
          className="bg-secondary text-white shadow-none"
          variant="contained"
          onClick={() => {
            navigate(`/test/add`);
          }}
        >
          Search
        </Button>

        <TextField
          onChange={(e) => setSearchTest(e.target.value)}
          value={searchTest}
          placeholder="Enter test name"
          size="small"
          style={{ width: 300 }}
          className="bg-white"
        />
      </div>

      <div className="d-flex flex-row ">
        {tests?.map((item, key) => {
          return <TestCard key={key} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Test;
