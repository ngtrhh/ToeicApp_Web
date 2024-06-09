import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";



const Courses = () => {
  const [sign, setSign] = useState("1");
  const [users, setUsers] = useState([]);
  const UserRow = ({ user }) => {
    const navigate = useNavigate();
  const viewTopic = (item) => {
    navigate("/course/" + user.classId, {
      state: { classId: user.classId, teacherId:user.userId},
    });
  };
  const allowfunc = async()=>{
    await Api.updateClass(user.classId,{allow:true});
    getTests()
  }
    return (
      <TableRow>
        <TableCell>{user.ClassName ? user.ClassName : "unk"}</TableCell>
        <TableCell>{user.Start_Date ? user.Start_Date: "unk"}</TableCell>
        <TableCell>{user.Finish_Date ? user.Finish_Date : "unk"}</TableCell>
        <TableCell>{user.MaximumStudents ? user.MaximumStudents : "unk"}</TableCell>
        <TableCell>
          {user.Skill ? user.Skill : "unk"}
        </TableCell>
        <TableCell>
          {user.Tuition ? user.Tuition : "unk"}
        </TableCell>
        <TableCell><Button  onClick={() => {viewTopic()}}>See</Button></TableCell>
        <TableCell><Button onClick={() => {allowfunc()}}>Allow</Button></TableCell>
        <TableCell><Button>Delete</Button></TableCell>
      </TableRow>
    );
  };
  const UserTable = ({ users }) => {
    return (
      <Paper>
        <Table>
          <TableHead style={{ backgroundColor: "#62A912" }}>
            <TableRow>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Title</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Start</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Finish</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                Maximum Student
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                About Skill
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                Fee
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}/>
              <TableCell style={{ color: "#fff", fontSize: 15 }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <UserRow key={index} user={user} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };
  const getTests = async () => {
    const list = await Api.getAllClasses()
    let filtered= list?.filter(function(item) {
        return item?.allow===false||item?.allow===undefined
       })
       setUsers(filtered)
  };

  useEffect(() => {
    getTests();
  }, []);
  
  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">Courses</div>

      <div className="d-flex flex-row justify-content-center">
        <Button
          onClick={() => {
            setSign("1")
            let filtered= users?.filter(function(item) {
                return item?.allow===false
               })
               setUsers(filtered)
          }}
          className={clsx(
            "shadow-none rounded-0",
            sign === "1" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Pending Approval 
        </Button>
        <Button
          onClick={() => {
            setSign("2")
            let filtered= users?.filter(function(item) {
                return item?.allow===true||item?.allow===undefined
               })
               setUsers(filtered)
          }}
          className={clsx(
            "shadow-none rounded-0",
            sign === "2" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Approved
        </Button>
      </div>
      <UserTable users={users} />
</div>
  )
}

export default Courses