import React, { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import api from "../api/Api";

const UserRow = ({ user }) => {
  return (
    <TableRow>
      <TableCell>{user.name ? user.name : "unk"}</TableCell>
      <TableCell>{user.email ? user.email : "unk"}</TableCell>
      <TableCell>{user.age ? user.age : "unk"}</TableCell>
      <TableCell>{"unk"}</TableCell>
      <TableCell>{user.currentScore ? user.currentScore : "unk"}</TableCell>
      <TableCell>{user.targetScore ? user.targetScore : "unk"}</TableCell>
      <TableCell>
        {user.HistoryPractice ? user.HistoryPractice.length : 0}
      </TableCell>
      <TableCell>
        {user.PracticeTime ? user.PracticeTime : "00:00:00"}
      </TableCell>
      <TableCell>{user.level ? user.level : "unk"}</TableCell>
    </TableRow>
  );
};
const UserTable = ({ users }) => {
  return (
    <Paper>
      <Table>
        <TableHead style={{ backgroundColor: "#62A912" }}>
          <TableRow>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>Name</TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>Email</TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>Age</TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Entry Score
            </TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Current Score
            </TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Target Score
            </TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Practice History
            </TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Practice Time
            </TableCell>
            <TableCell style={{ color: "#fff", fontSize: 15 }}>
              Expected Level
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <UserRow key={index} user={user} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
function User() {
  const [users, setUsers] = useState([]);

  const getTests = async () => {
    const list = await api.getUsers();
    for (let data of list) {
      if (data.currentScore) {
        if (data.currentScore >= 0 && data.currentScore <= 250) {
          data.level = "0 (Basic Proficiency)";
        } else if (data.currentScore <= 400) {
          data.level = "1 (Elementary Proficiency)";
        } else if (data.currentScore <= 600) {
          data.level = "2 (Elementary Proficiency Plus)";
        } else if (data.currentScore <= 780) {
          data.level = "3 (Limited Working Proficiency)";
        } else if (data.currentScore <= 900) {
          data.level = "4 (Working Proficiency Plus)";
        } else if (data.currentScore <= 990) {
          data.level = "5 (International Professional Proficiency)";
        }
      }
    }
    setUsers(list);
  };

  useEffect(() => {
    getTests();
  }, []);
  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <h2 style={{ marginTop: 20, textAlign: "center", marginBottom: 10 }}>
        User List
      </h2>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <input
          className="customInput"
          style={{ width: 250, height: 40, marginLeft: 10 }}
          type="text"
          // onChange={(e) => {
          //   setSearchVocab(e.target.value)
          // }}
          // value={searchVocab}
          placeholder="Enter user name"
        ></input>
        <input
          className="customInput"
          style={{ width: 250, height: 40, marginLeft: 10 }}
          type="text"
          // onChange={(e) => {
          //   setSearchVocab(e.target.value)
          // }}
          // value={searchVocab}
          placeholder="Enter email"
        ></input>
      </div>
      <button
        type="button"
        className="btn btn-light"
        style={{
          backgroundColor: "#F88C19",
          color: "#fff",
          marginLeft: 10,
          marginBottom: 15,
        }}
      >
        Search
      </button>
      <UserTable users={users} />
    </div>
  );
}

export default User;
