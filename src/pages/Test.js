import React, { useState, useEffect } from "react";
import "../styles/Test.css";
import TestItem from "../components/TestItem";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";

function Test() {
  const [searchTest, setSearchTest] = useState("");
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const getTests = async () => {
    const list = await api.getAllTest();
    setTests(list);
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div>
      <h2 style={{ marginLeft: 20, marginTop: 20, textAlign: "center" }}>
        Test List
      </h2>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <button
          type="button"
          className="btn btn-light"
          style={{ backgroundColor: "#F88C19", color: "#fff", marginLeft: 30 }}
          onClick={() => {
            navigate(`/Test/add`);
          }}
        >
          Add Test
        </button>
        <button
          type="button"
          className="btn btn-light"
          style={{ backgroundColor: "#5DA110", color: "#fff", marginLeft: 10 }}
        >
          Search
        </button>
        <input
          className="customInput"
          style={{ width: 250, height: 40, marginLeft: 10 }}
          type="text"
          onChange={(e) => {
            setSearchTest(e.target.value);
          }}
          value={searchTest}
          placeholder="Enter test name"
        ></input>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div className="grid-container" style={{ marginLeft: 20 }}>
          {tests?.map((each, key) => {
            return (
              <TestItem
                item={each}
                trashClick={async () => {
                  const shouldDelete = window.confirm(
                    "Are you sure you want to delete this test?"
                  );
                  if (shouldDelete) {
                    const list = tests.slice();
                    list.splice(key, 1);
                    setTests(list);
                    //await api.deleteTest(each.Id);
                  }
                }}
                penClick={() => {
                  navigate(`/Test/${each.Id}`, {
                    state: { item: each, flag: "fix" },
                  });
                }}
                eyeClick={() => {
                  navigate(`/Test/${each.Id}`, {
                    state: { item: each, flag: "see" },
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Test;
