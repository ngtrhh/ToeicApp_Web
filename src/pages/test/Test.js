import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";
import TestCard from "../../components/TestCard";
import "../../styles/Test.css";

function Test() {
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
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="text-primary fw-semibold fs-5 text-uppercase">
          Test list
        </div>
        <div style={{ flexGrow: 1 }} />

        <Button
          className="shadow-none bg-secondary "
          variant="contained"
          onClick={() => {
            navigate(`/test/add`);
          }}
          startIcon={<Add />}
        >
          Add Test
        </Button>
      </div>

      {/* <div className="d-flex flex-row gap-4">
        
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
      </div> */}

      <div className="d-flex flex-row ">
        {tests?.map((item, key) => {
          return <TestCard key={key} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Test;
